# Clawdio

An experimental project aimed to create modern effects for the Web Audio API using WASM and Rust. We leverage the Audio Worklet API to offload audio processing to a separate thread, then use WASM to process the audio even faster using Rust.

This project includes a series of JavaScript modules you can include in your web audio project for creating different effects.

## Features

- Bitcrusher

## Getting Started

1. Install the effect you want: `npm install @clawdio/bitcrusher`
1. Import the specific effect you need and use it! Check each effect for docs on how to use.

## Development

This project includes both Typescript frontend code for each effect, and corresponding WASM modules written in Rust.

### Requirements

- NodeJS
- Rust
- [wasm-pack](https://github.com/rustwasm/wasm-pack)

## References

- [rust-wasm-library-template](https://github.com/whoisryosuke/rust-wasm-library-template)
- [react-vite-library-boilerplate](https://github.com/whoisryosuke/react-vite-library-boilerplate)
- [web-audio-sketchbook](https://github.com/whoisryosuke/web-audio-playground/)
