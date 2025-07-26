export default function lerp(
  startValue: number,
  endValue: number,
  t: number,
  offset: number = 0
) {
  // Clamp t between 0 and 1 (important for safety)
  t = Math.max(0, Math.min(1, t));

  // Apply the offset to 't'. This shifts the interpolation curve.
  const adjustedT = t + offset;

  return startValue + (endValue - startValue) * adjustedT;
}
