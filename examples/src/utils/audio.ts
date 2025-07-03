import type { ADSRConfig } from "../types/audio";

/**
 * Applies a ADSR envelope to the audio stream at the provided time. This basically makes audio fade in.
 * @param gainParam The gain parameter from the gain node (usually `gainNode.gain`)
 * @param time Time to start envelope
 * @param config
 */
export function scheduleADSR(
  gainParam: AudioParam,
  time: number,
  config: ADSRConfig
) {
  const { attack, sustain, decay, release, peak } = config;

  // Cancel all previous parameters
  gainParam.cancelScheduledValues(time);

  // Start ramp up from 0
  gainParam.setValueAtTime(0, time);

  // Attack - Ramps up to the peak
  gainParam.linearRampToValueAtTime(peak, time + attack);

  // Sustain - Ramps to sustain
  gainParam.linearRampToValueAtTime(sustain * peak, time + attack + decay);

  // Release - Ramps to nothing
  gainParam.linearRampToValueAtTime(0, time + attack + decay + release);
}

/**
 * Releases ADSR envelope at provided time. Basically fades audio out. Optional - if you need to have a key held vs knowing the duration.
 * @param gainParam The gain parameter from the gain node (usually `gainNode.gain`)
 * @param time
 * @param duration
 */
export function releaseADSR(
  gainParam: AudioParam,
  time: number,
  duration: 0.3
) {
  gainParam.cancelScheduledValues(time);
  gainParam.setValueAtTime(gainParam.value, time);
  gainParam.linearRampToValueAtTime(0, time + duration);
}
