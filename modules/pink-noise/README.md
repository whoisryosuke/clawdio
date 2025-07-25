# Pink Noise

Pink noise implemented as a Rust module that gets exported to web using WASM.

## Notes

Pink noise sounds like waves on a beach, a waterfall, or a gentle “whoosh” sound. It’s a common sound signature that’s found in nature.

We still generate a random number from `-1` to `1`, but it distributes the them so they “sound” more equal. Low end frequencies tend to get highlighted more, creating deeper mellow sounds.

This is kind of similar to gaussian noise, which is a kind of noise that’s interpolated so transitions are smoother. You might have encountered it in graphics apps like Blender or Photoshop named “Clouds”.

But it differs from gaussian, where the gaussian algorithm distributes it’s values on a Gaussian curve (bell-shaped, creating the soft “gradient” we see visually). Instead, pink noise decreases power by 3dB every octave, more on a logarithmic scale.

I referenced [this Noisehack blog post](https://noisehack.com/generate-noise-web-audio-api/), which references an algorithm by Paul Kellet published in 2000. You can find the [original algorithm on MusicDSP](https://www.musicdsp.org/en/latest/Filters/76-pink-noise-filter.html), which also lists an “economical” version with only 3 filters vs 6.

```tsx
b0 = 0.99886 * b0 + white * 0.0555179;
b1 = 0.99332 * b1 + white * 0.0750759;
b2 = 0.969 * b2 + white * 0.153852;
b3 = 0.8665 * b3 + white * 0.3104856;
b4 = 0.55 * b4 + white * 0.5329522;
b5 = -0.7616 * b5 - white * 0.016898;
pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
b6 = white * 0.115926;
```

And the economy version with an accuracy of +/- 0.5dB:

```tsx
b0 = 0.99765 * b0 + white * 0.099046;
b1 = 0.963 * b1 + white * 0.2965164;
b2 = 0.57 * b2 + white * 1.0526913;
pink = b0 + b1 + b2 + white * 0.1848;
```

You can see that this formula uses a `white` variable — that represents white noise - aka just a random number from `-1` to `1`. All the other variables start at 0 and add up as we go.

## Development

Read the [shared module documentation](../README.MD) for a full guide on running this locally.

## References

- [Paul Kellet (Original Formula)](https://www.musicdsp.org/en/latest/Filters/76-pink-noise-filter.html)
- [Pink Noise](https://en.wikipedia.org/wiki/Pink_noise)
- [NoiseHack](https://noisehack.com/generate-noise-web-audio-api/)
