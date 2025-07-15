# Rust WASM Modules

These are WASM modules written in Rust used for web audio workers.

## Requirements

- Rust
- [wasm-pack](https://github.com/rustwasm/wasm-pack)

## Development

Each module is it's own project, so you'll need to run this in each folder.

1. Write code (or import it into) in `lib.rs`

## Building

Build project using:

- General use: `wasm-pack build`
- AudioWorklet: `wasm-pack build --target web`

This generates a WASM build, and nice JS + TS glue files, inside the `/pkg` folder.

For the general use version you'll likely need to use a build plugin to handle the WASM, like `vite-plugin-wasm` for a Vite build system.

> If building for AudioWorklet, make sure to add the `--target web` flag or you'll get errors about TextEncoder missing, or a global `URL` variable being undefined.

### Building all modules

You can build all modules using this command at the root of the project: `yarn build:modules`

## Using code

1. Build project (see above)
1. Go into build folder: `cd pkg`
1. Create a link to the module: `yarn link`
1. Go into another JS project and link the module: `yarn link clawdio-modulename`

# References

Based on [wasm-pack-template](https://github.com/rustwasm/wasm-pack-template/tree/master) and [this guide.](rustwasm.github.io/docs/book/game-of-life/hello-world.html#build-the-project)
