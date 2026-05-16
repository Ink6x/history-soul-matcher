import { claude, CLAUDE_CONFIG } from '@/lib/claude';
import { NARRATIVE_PROMPT } from '@/content/system-prompt';
import { FEATURE_LABELS_JA, type FacialFeatureProfile, type FeatureBreakdownItem } from '@/types/features';
import type { HistoricalFigure } from '@/content/historical-figures';

const TOOL_NAME = 'output_narrative';

const TOOL = {
  name: TOOL_NAME,
  description: '診断の語りを構造化して出力する',
  input_schema: {
    type: 'object' as const,
    properties: {
      reason: { type: 'string', description: '上位の一致特徴を引用した診断理由 2〜3 文（敬意のあるトーン）' },
      episode: { type: 'string', description: 'その歴史人物の有名なエピソード 1〜2 文' },
      quote: { type: 'string', description: '人物の名言または名言風の一節 1 つ（「」で括る）' },
    },
    required: ['reason', 'episode', 'quote'],
  },
  cache_control: { type: 'ephemeral' as const },
};

export type Narrative = {
  reason: string;
  episode: string;
  quote: string;
};

function describeBreakdownItem(item: FeatureBreakdownItem): string {
  const label = FEATURE_LABELS_JA[item.feature];
  return `${label}: あなた=${item.userValue} / 人物=${item.figureValue} (寄与${item.contribution}点)`;
}

export async function generateNarrative(args: {
  userFeatures: FacialFeatureProfile;
  matchedFigure: HistoricalFigure;
  topBreakdownItems: FeatureBreakdownItem[];
  matchRate: number;
}): Promise<Narrative> {
  const { userFeatures, matchedFigure, topBreakdownItems } = args;
  const userTags = userFeatures.overallImpression.join(', ');
  const figureTags = matchedFigure.features.overallImpression.join(', ');
  const matched = topBreakdownItems.filter((i) => i.matched).slice(0, 3);
  const matchedSummary = matched.length > 0
    ? matched.map(describeBreakdownItem).join('\n')
    : '(完全一致した特徴はありませんが、全体の印象が呼応しています)';

  const userMessage = `# 一致した歴史人物
${matchedFigure.name} (${matchedFigure.era})
キーワード: ${matchedFigure.traits.join('・')}

# 上位の一致特徴
${matchedSummary}

# 印象タグ
あなた: ${userTags} / 人物: ${figureTags}`;

  const response = await claude.messages.create({
    model: CLAUDE_CONFIG.narrativeModel,
    max_tokens: 500,
    temperature: 0.7,
    system: [
      {
        type: 'text',
        text: NARRATIVE_PROMPT,
        cache_control: { type: 'ephemeral' },
      },
    ],
    tools: [TOOL],
    tool_choice: { type: 'tool', name: TOOL_NAME },
    messages: [{ role: 'user', content: userMessage }],
  });

  console.log('[generate-narrative] meta:', {
    model: CLAUDE_CONFIG.narrativeModel,
    stop_reason: response.stop_reason,
    usage: response.usage,
  });

  const toolUse = response.content.find((b) => b.type === 'tool_use');
  if (!toolUse || toolUse.type !== 'tool_use') {
    throw new Error(`generate-narrative: no tool_use block (stop_reason=${response.stop_reason})`);
  }
  return toolUse.input as Narrative;
}
