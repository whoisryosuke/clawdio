# Clawdio

An experimental project aimed to create modern effects for the Web Audio API using WASM and Rust.

We leverage the [Audio Worklet API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_AudioWorklet) to offload audio processing to a separate thread, then use [WebAssembly (WASM)](https://webassembly.org/) to process the audio even faster using [Rust](https://www.rust-lang.org/).

This library includes a series of JavaScript modules you can include in your web audio projects to create different effects.

## Features

- Bitcrusher

## Getting Started

1. Install the effect you want: `npm install clawdio`
1. Import the worklet for the effect you need and use it! Check the docs on how to use: `import { Bitcrusher } from 'clawdio'`

## Development

This project includes both Typescript frontend code for each Audio Worklet, and corresponding WASM modules written in Rust.

### Requirements

- NodeJS
- Rust
- [wasm-pack](https://github.com/rustwasm/wasm-pack)

### Overview

This library exports audio worklets to use in the Web Audio API.

**Rust WASM** modules go inside `/modules/` folder. Each module should be self-contained and able to build itself using `wasm-pack`. This is based off the [rust-wasm-library-template](https://github.com/whoisryosuke/rust-wasm-library-template).

**Frontend JS** code goes in `/src/` folder. Export any functions, components, etc using the `src/index.ts` file. This gets distributed to NPM.

### Creating new worklet

You'll want to create a worklet first:

1. Start in the `src/workers/` and create an `AudioWorkletProcessor` for your effect. Ideally copy the existing template to support WASM initialization.
1. In the `process()` function of the `AudioWorkletProcessor`, you can run the Rust WASM module.

Then you can create a Rust WASM module that handles processing:

1. Create a new module inside `/modules/` folder, ideally just copy an existing effect.
1. Change the module name in the `Cargo.toml` to be `clawdio-youreffectname`.
1. Write any Rust code.
1. Build the modules: `yarn build:modules`
1. You should see a `/pkg` folder inside the `/modules/yourmodule/` with the WASM. And if you check `/public` folder, the WASM should be copied there too.
1. Try using the Rust module in the frontend code.

### Building

1. Build WASM modules and copy over the `.wasm` files to asset folder: `yarn build:modules`.
1. Build the library code: `yarn build`

### Release

TBD. Should be handled by GitHub Actions.

## References

- [Processing Web Audio with Rust and WASM](https://whoisryosuke.com/blog/2025/processing-web-audio-with-rust-and-wasm)
- [rust-wasm-library-template](https://github.com/whoisryosuke/rust-wasm-library-template)
- [react-vite-library-boilerplate](https://github.com/whoisryosuke/react-vite-library-boilerplate)
- [web-audio-sketchbook](https://github.com/whoisryosuke/web-audio-playground/)
