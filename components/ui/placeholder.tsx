type PlaceholderProps = {
  /** Uppercase mono label describing the intended photo. */
  label: string;
  /** CSS aspect-ratio, e.g. "16/9", "4/5", "4/3". */
  ratio: string;
};

/**
 * Patterned placeholder box standing in for project photography that
 * hasn't been supplied yet. Swap with `next/image` when real photos land;
 * keep the surrounding captions.
 */
export function Placeholder({ label, ratio }: PlaceholderProps) {
  return (
    <div className="ph" style={{ aspectRatio: ratio }}>
      <span className="phlabel">{label}</span>
    </div>
  );
}
