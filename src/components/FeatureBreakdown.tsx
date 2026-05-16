import { FEATURE_LABELS_JA, MATCH_LEVEL_LABELS_JA, type FeatureKey } from '@/types/features';
import type { AnalysisResult } from '@/types/analysis';

type Props = {
  items: AnalysisResult['featureBreakdown'];
};

const KNOWN_KEYS = new Set<FeatureKey>([
  'faceShape', 'jawline', 'eyeShape', 'eyeSpacing',
  'noseShape', 'browShape', 'lipFullness', 'cheekbones', 'overallImpression',
]);


function getScoreStyles(score: number): { text: string; bar: string } {
  const s = Math.min(10, Math.max(0, score));
  if (s >= 9) return { text: 'text-emerald-300', bar: 'bg-emerald-400' };
  if (s >= 7) return { text: 'text-lime-300',    bar: 'bg-lime-400'    };
  if (s >= 5) return { text: 'text-yellow-300',  bar: 'bg-yellow-400'  };
  if (s >= 3) return { text: 'text-orange-300',  bar: 'bg-orange-400'  };
  if (s >= 1) return { text: 'text-red-400',     bar: 'bg-red-500'     };
  return             { text: 'text-zinc-500',    bar: 'bg-zinc-700'    };
}

function labelFor(featureKey: string): string {
  return KNOWN_KEYS.has(featureKey as FeatureKey)
    ? FEATURE_LABELS_JA[featureKey as FeatureKey]
    : featureKey;
}

export function FeatureBreakdown({ items }: Props) {
  const sorted = [...items]
    .filter((item) => item.feature !== 'overallImpression')
    .sort((a, b) => b.contribution - a.contribution);
  return (
    <ul className="flex flex-col gap-3">
      {sorted.map((item) => {
        const displayScore = item.displayContribution;
        const ratio = Math.round((displayScore / item.maxContribution) * 100);
        const scoreStyles = getScoreStyles(displayScore);
        const levelLabel = MATCH_LEVEL_LABELS_JA[item.matchLevel];
        return (
          <li
            key={item.feature}
            className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-amber-200/90">{labelFor(item.feature)}</span>
              <span className={`text-xs font-bold tabular-nums ${scoreStyles.text}`}>
                {displayScore}/{item.maxContribution} pt
              </span>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-3 text-xs text-zinc-400">
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-zinc-600">あなた</span>
                <span className="text-zinc-200">{item.userValue}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-zinc-600">人物</span>
                <span className="text-zinc-200">{item.figureValue}</span>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div
                className="flex-1 h-1.5 rounded-full bg-zinc-800 overflow-hidden"
                role="progressbar"
                aria-valuenow={ratio}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuetext={`${labelFor(item.feature)}: ${levelLabel}, ${displayScore}/${item.maxContribution}ポイント`}
              >
                <div
                  className={`h-full transition-all ${scoreStyles.bar}`}
                  style={{ width: `${ratio}%` }}
                />
              </div>
              <span className={`text-[10px] whitespace-nowrap ${scoreStyles.text}`}>{levelLabel}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
