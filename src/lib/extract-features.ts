import { claude, CLAUDE_CONFIG } from '@/lib/claude';
import { EXTRACT_FEATURES_PROMPT } from '@/content/system-prompt';
import {
  FACE_SHAPES, JAWLINES, EYE_SHAPES, EYE_SPACINGS,
  NOSE_SHAPES, BROW_SHAPES, LIP_FULLNESSES, CHEEKBONES,
  type UserFacialProfile,
} from '@/types/features';

type ImageMediaType = 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif';

const TOOL_NAME = 'extract_facial_features';

const INTENSITY = {
  type: 'integer' as const,
  minimum: 1,
  maximum: 10,
  description: '特徴の際立ち度 (1=控えめ, 5=標準, 10=際立つ)',
};

const TOOL = {
  name: TOOL_NAME,
  description: '写真から顔の構造的特徴を抽出する',
  input_schema: {
    type: 'object' as const,
    properties: {
      faceShape: { type: 'string', enum: [...FACE_SHAPES] },
      faceShapeIntensity: INTENSITY,
      jawline: { type: 'string', enum: [...JAWLINES] },
      jawlineIntensity: INTENSITY,
      eyeShape: { type: 'string', enum: [...EYE_SHAPES] },
      eyeShapeIntensity: INTENSITY,
      eyeSpacing: { type: 'string', enum: [...EYE_SPACINGS] },
      eyeSpacingIntensity: INTENSITY,
      noseShape: { type: 'string', enum: [...NOSE_SHAPES] },
      noseShapeIntensity: INTENSITY,
      browShape: { type: 'string', enum: [...BROW_SHAPES] },
      browShapeIntensity: INTENSITY,
      lipFullness: { type: 'string', enum: [...LIP_FULLNESSES] },
      lipFullnessIntensity: INTENSITY,
      cheekbones: { type: 'string', enum: [...CHEEKBONES] },
      cheekbonesIntensity: INTENSITY,
      overallImpression: {
        type: 'array',
        items: { type: 'string' },
        minItems: 3,
        maxItems: 5,
        description: '形状から想起される印象タグ (英語短語) 3〜5個',
      },
    },
    required: [
      'faceShape', 'faceShapeIntensity',
      'jawline', 'jawlineIntensity',
      'eyeShape', 'eyeShapeIntensity',
      'eyeSpacing', 'eyeSpacingIntensity',
      'noseShape', 'noseShapeIntensity',
      'browShape', 'browShapeIntensity',
      'lipFullness', 'lipFullnessIntensity',
      'cheekbones', 'cheekbonesIntensity',
      'overallImpression',
    ],
  },
  cache_control: { type: 'ephemeral' as const },
};

/**
 * Stage 1: Send the user's photo to Claude Vision and extract structured facial features.
 * Uses Tool Use with closed enums to guarantee schema-valid output.
 * Throws if the model truncates the response or returns no tool_use block.
 */
export async function extractUserFeatures(
  base64: string,
  mediaType: ImageMediaType,
): Promise<UserFacialProfile> {
  const response = await claude.messages.create({
    model: CLAUDE_CONFIG.extractModel,
    max_tokens: 600,
    temperature: 0,
    system: [
      {
        type: 'text',
        text: EXTRACT_FEATURES_PROMPT,
        cache_control: { type: 'ephemeral' },
      },
    ],
    tools: [TOOL],
    tool_choice: { type: 'tool', name: TOOL_NAME },
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image',
            source: { type: 'base64', media_type: mediaType, data: base64 },
          },
          {
            type: 'text',
            text: 'この写真の顔の構造的特徴を抽出してください。',
          },
        ],
      },
    ],
  });

  if (response.stop_reason === 'max_tokens') {
    throw new Error(
      `extract-features: tool response truncated (output_tokens=${response.usage.output_tokens}, increase max_tokens)`,
    );
  }

  const toolUse = response.content.find((b) => b.type === 'tool_use');
  if (!toolUse || toolUse.type !== 'tool_use') {
    throw new Error(`extract-features: no tool_use block (stop_reason=${response.stop_reason})`);
  }
  return toolUse.input as UserFacialProfile;
}
