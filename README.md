![Clawdio red logo and white logotype centered on a black background](./docs/clawdio-black-bg.jpg)

# Clawdio

An experimental library for creating modern audio effects for the Web Audio API using WASM and Rust.

We leverage the [Audio Worklet API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_AudioWorklet) to offload audio processing to a separate thread, then use [WebAssembly (WASM)](https://webassembly.org/) to process the audio even faster using [Rust](https://www.rust-lang.org/).

This library includes a series of JavaScript modules you can include in your web audio projects to create different effects.

**[Browse the documentation here](https://whoisryosuke.github.io/clawdio/)**

## Effects

- **[Bitcrusher](https://whoisryosuke.github.io/clawdio/docs/effects/bitcrusher)** (8-bit effect)
- **[Moog Filter](https://whoisryosuke.github.io/clawdio/docs/effects/moog)** (Low-pass filter)
- **[Pink Noise](https://whoisryosuke.github.io/clawdio/docs/effects/pink-noise)** (Procedural noise)

## Features

- 🎸 **Easy to use**: Super simple API for custom audio nodes
- ⛓️‍💥 **Zero dependencies**: Pure JS wrappers around Web Audio APIs
- 🎛️ **Modular**: Use each effect directly (`yarn add clawdio-bitcrusher`)
- 📦 **WASM**: Leverage WASM for more efficient processing
- 📑 **Typescript**: Import types like `BitcrusherNode` to make work easier.
- 🧪 **Tested**: Signal math operations tested for validity

## Getting Started

1. Install the library: `npm install clawdio`
1. Import the worklet node for the effect you need and use it! Each worklet node function returns an object with an `node` property containing the `AudioWorkletNode` you want.

```tsx
import { createBitcrusherNode } from "clawdio";

const context = new AudioContext();
const oscillatorNode = context.createOscillator();

const createBitcrusherWorklet = async (id: string) => {
  // Create the node using our helper function
  const bitcrusher = await createBitcrusherNode(context, 4, 0.1);

  // Connect the node
  oscillatorNode.connect(bitcrusher.node);
  bitcrusher.node.connect(context.destination);
};

await createBitcrusherWorklet();
```

Check the [example app](packages/examples/src/components/) for examples for each module. And the [documentation site](https://whoisryosuke.github.io/clawdio/docs/intro/getting-started) for more details.

### Using WASM directly

If you want greater control over the WASM, you can import each WASM module directly. They're each individually released to NPM alongside the main library.

For example the Bitcrusher node would be: `yarn add clawdio-bitcrusher`

You can find an example of how to use it [in the library code](packages/clawdio/src/nodes/BitcrusherNode.ts).

## Development

This project includes both Typescript frontend code for each Audio Worklet, and corresponding WASM modules written in Rust.

### Requirements

- NodeJS
- [Rust](https://www.rust-lang.org/)
- [wasm-pack](https://github.com/rustwasm/wasm-pack)

### Overview

This library exports audio worklets to use in the Web Audio API.

**Rust WASM** modules go inside `/modules/` folder. Each module should be self-contained and able to build itself using `wasm-pack`. Each module is based off the [rust-wasm-library-template](https://github.com/whoisryosuke/rust-wasm-library-template). The whole folder itself is a monorepo, allowing for sharing code between modules if needed. Find more info [in the README there](modules/README.MD).

**Frontend JS** code goes in `/packages/clawdio/src/` folder. Export any functions, components, etc using the `index.ts` file. This gets distributed to NPM. This based off [react-vite-library-boilerplate](https://github.com/whoisryosuke/react-vite-library-boilerplate).

> The library code is packaged together into one file (e.g. `clawdio.es.js`), but each worklet and WASM module are bundled and fetched individually to reduce the library size. You can also install each Rust module individually and use them directly if desired.

### Creating new worklet

You'll want to create a worklet first:

1. Start in the `src/workers/` and create an `AudioWorkletProcessor` for your effect. Ideally copy the existing template to support WASM initialization.
1. In the `process()` function of the `AudioWorkletProcessor`, you can run the Rust WASM module.

Then you can create a Rust WASM module that handles processing:

1. Create a new module inside `/modules/` folder, ideally just copy an existing effect.
1. Change the module name in the `Cargo.toml` to be `clawdio-youreffectname`.
1. Write any Rust code.
1. Build all the modules: `yarn build:modules` or the individual module using `wasm-pack build --target web`
1. You should see a `/pkg` folder inside the `/modules/yourmodule/` with the WASM.
1. Install the Rust module as a dependency to the `clawdio` project. Use the latest version or `*` as version to ensure it sources locally.
1. Try using the Rust module in the frontend code.

### Debugging Tips

- You cannot use `println!()` or any kind of debug log statements in the WASM bundle because of the lack of `TextEncoder` in the worker's JS context.
- Try loading the WASM module in isolation - outside of the audio worklet. This ensures worklet is broken, and not just using restricted APIs in worklet context (like `crypto`). I like spinning up a fresh Vite app and just linking (`yarn link`) the any specific modules over.
- Your order of operation should be: create Rust tests to validate module, integration test with WASM in worklet, then end to end test in a frontend app.

### Building

1. Build WASM modules: `yarn build:modules`.
1. Build the library code: `yarn build`

### Release

1. Increment version in `package.json` of your module (aka `clawdio`, or a Rust module)
1. Commit the version change: `git commit -m ":bookmark: v4.2.0"`
1. Push your changes.
1. Tag the version change: `git tag v4.2.0`
1. Push the version change: `git push origin v4.2.0`
1. Go to GitHub and create a new release. Select the tag you just created.

The build and release will automatically run once a release is created. You can track this in the GitHub Actions tab.

This publishes the main [`clawdio`](https://www.npmjs.com/package/clawdio) library, as well as all Rust WASM modules, to NPM.

> Working on a more automated system for this soon.

## References

- [Web Audio Effect Library with Rust and WASM](https://whoisryosuke.com/blog/2025/web-audio-effect-library-with-rust-and-wasm)
- [Processing Web Audio with Rust and WASM](https://whoisryosuke.com/blog/2025/processing-web-audio-with-rust-and-wasm)
- [rust-wasm-library-template](https://github.com/whoisryosuke/rust-wasm-library-template)
- [react-vite-library-boilerplate](https://github.com/whoisryosuke/react-vite-library-boilerplate)
- [web-audio-sketchbook](https://github.com/whoisryosuke/web-audio-playground/)
