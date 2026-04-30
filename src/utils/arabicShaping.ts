type ArabicForm = {
  isolated: string;
  final?: string;
  initial?: string;
  medial?: string;
  joinPrev: boolean;
  joinNext: boolean;
};

type ShapedCluster = {
  display: string;
  source: string;
  start: number;
  end: number;
};

const COMBINING_MARK = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/;

const FORMS: Record<string, ArabicForm> = {
  "ء": { isolated: "ﺀ", joinPrev: false, joinNext: false },
  "آ": { isolated: "ﺁ", final: "ﺂ", joinPrev: true, joinNext: false },
  "أ": { isolated: "ﺃ", final: "ﺄ", joinPrev: true, joinNext: false },
  "ؤ": { isolated: "ﺅ", final: "ﺆ", joinPrev: true, joinNext: false },
  "إ": { isolated: "ﺇ", final: "ﺈ", joinPrev: true, joinNext: false },
  "ئ": { isolated: "ﺉ", final: "ﺊ", initial: "ﺋ", medial: "ﺌ", joinPrev: true, joinNext: true },
  "ا": { isolated: "ﺍ", final: "ﺎ", joinPrev: true, joinNext: false },
  "ب": { isolated: "ﺏ", final: "ﺐ", initial: "ﺑ", medial: "ﺒ", joinPrev: true, joinNext: true },
  "ة": { isolated: "ﺓ", final: "ﺔ", joinPrev: true, joinNext: false },
  "ت": { isolated: "ﺕ", final: "ﺖ", initial: "ﺗ", medial: "ﺘ", joinPrev: true, joinNext: true },
  "ث": { isolated: "ﺙ", final: "ﺚ", initial: "ﺛ", medial: "ﺜ", joinPrev: true, joinNext: true },
  "ج": { isolated: "ﺝ", final: "ﺞ", initial: "ﺟ", medial: "ﺠ", joinPrev: true, joinNext: true },
  "ح": { isolated: "ﺡ", final: "ﺢ", initial: "ﺣ", medial: "ﺤ", joinPrev: true, joinNext: true },
  "خ": { isolated: "ﺥ", final: "ﺦ", initial: "ﺧ", medial: "ﺨ", joinPrev: true, joinNext: true },
  "د": { isolated: "ﺩ", final: "ﺪ", joinPrev: true, joinNext: false },
  "ذ": { isolated: "ﺫ", final: "ﺬ", joinPrev: true, joinNext: false },
  "ر": { isolated: "ﺭ", final: "ﺮ", joinPrev: true, joinNext: false },
  "ز": { isolated: "ﺯ", final: "ﺰ", joinPrev: true, joinNext: false },
  "س": { isolated: "ﺱ", final: "ﺲ", initial: "ﺳ", medial: "ﺴ", joinPrev: true, joinNext: true },
  "ش": { isolated: "ﺵ", final: "ﺶ", initial: "ﺷ", medial: "ﺸ", joinPrev: true, joinNext: true },
  "ص": { isolated: "ﺹ", final: "ﺺ", initial: "ﺻ", medial: "ﺼ", joinPrev: true, joinNext: true },
  "ض": { isolated: "ﺽ", final: "ﺾ", initial: "ﺿ", medial: "ﻀ", joinPrev: true, joinNext: true },
  "ط": { isolated: "ﻁ", final: "ﻂ", initial: "ﻃ", medial: "ﻄ", joinPrev: true, joinNext: true },
  "ظ": { isolated: "ﻅ", final: "ﻆ", initial: "ﻇ", medial: "ﻈ", joinPrev: true, joinNext: true },
  "ع": { isolated: "ﻉ", final: "ﻊ", initial: "ﻋ", medial: "ﻌ", joinPrev: true, joinNext: true },
  "غ": { isolated: "ﻍ", final: "ﻎ", initial: "ﻏ", medial: "ﻐ", joinPrev: true, joinNext: true },
  "ف": { isolated: "ﻑ", final: "ﻒ", initial: "ﻓ", medial: "ﻔ", joinPrev: true, joinNext: true },
  "ق": { isolated: "ﻕ", final: "ﻖ", initial: "ﻗ", medial: "ﻘ", joinPrev: true, joinNext: true },
  "ك": { isolated: "ﻙ", final: "ﻚ", initial: "ﻛ", medial: "ﻜ", joinPrev: true, joinNext: true },
  "ک": { isolated: "ﮎ", final: "ﮏ", initial: "ﮐ", medial: "ﮑ", joinPrev: true, joinNext: true },
  "ل": { isolated: "ﻝ", final: "ﻞ", initial: "ﻟ", medial: "ﻠ", joinPrev: true, joinNext: true },
  "م": { isolated: "ﻡ", final: "ﻢ", initial: "ﻣ", medial: "ﻤ", joinPrev: true, joinNext: true },
  "ن": { isolated: "ﻥ", final: "ﻦ", initial: "ﻧ", medial: "ﻨ", joinPrev: true, joinNext: true },
  "ه": { isolated: "ﻩ", final: "ﻪ", initial: "ﻫ", medial: "ﻬ", joinPrev: true, joinNext: true },
  "و": { isolated: "ﻭ", final: "ﻮ", joinPrev: true, joinNext: false },
  "ى": { isolated: "ﻯ", final: "ﻰ", joinPrev: true, joinNext: false },
  "ي": { isolated: "ﻱ", final: "ﻲ", initial: "ﻳ", medial: "ﻴ", joinPrev: true, joinNext: true },
  "ی": { isolated: "ﯼ", final: "ﯽ", initial: "ﯾ", medial: "ﯿ", joinPrev: true, joinNext: true },
};

function splitArabicClusters(text: string) {
  const clusters: { source: string; base: string; marks: string; start: number; end: number }[] = [];
  let currentStart = 0;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];

    if (COMBINING_MARK.test(char) && clusters.length > 0) {
      const prev = clusters[clusters.length - 1];
      prev.source += char;
      prev.marks += char;
      prev.end = i + 1;
      continue;
    }

    clusters.push({
      source: char,
      base: char,
      marks: "",
      start: currentStart,
      end: i + 1,
    });
    currentStart = i + 1;
  }

  return clusters;
}

function canJoin(previousBase: string | undefined, currentBase: string | undefined) {
  if (!previousBase || !currentBase) return false;
  const previous = FORMS[previousBase];
  const current = FORMS[currentBase];
  if (!previous || !current) return false;
  return previous.joinNext && current.joinPrev;
}

export function getActiveArabicClusterIndex(text: string, activeIndex: number) {
  const clusters = splitArabicClusters(text);
  return clusters.findIndex(
    (cluster) => activeIndex >= cluster.start && activeIndex < cluster.end
  );
}

export function shapeArabicClusters(text: string): ShapedCluster[] {
  const clusters = splitArabicClusters(text);

  return clusters.map((cluster, index) => {
    const form = FORMS[cluster.base];

    if (!form) {
      return {
        display: cluster.source,
        source: cluster.source,
        start: cluster.start,
        end: cluster.end,
      };
    }

    const prevBase = clusters[index - 1]?.base;
    const nextBase = clusters[index + 1]?.base;
    const joinPrev = canJoin(prevBase, cluster.base);
    const joinNext = canJoin(cluster.base, nextBase);

    let shapedBase = form.isolated;
    if (joinPrev && joinNext && form.medial) shapedBase = form.medial;
    else if (joinPrev && form.final) shapedBase = form.final;
    else if (joinNext && form.initial) shapedBase = form.initial;

    return {
      display: `${shapedBase}${cluster.marks}`,
      source: cluster.source,
      start: cluster.start,
      end: cluster.end,
    };
  });
}
