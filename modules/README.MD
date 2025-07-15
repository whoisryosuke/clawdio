# Rust WASM Modules

These are WASM modules written in Rust used for web audio workers.

## Requirements

- Rust
- [wasm-pack](https://github.com/rustwasm/wasm-pack)

## Development

The `/modules/` folder is a Rust monorepo containing many modules or "crates". Each effect has it's own Rust project (or "crate").

1. Write code (or import it into) in `lib.rs`

### Adding new modules

1. Create a new Rust project inside the `/modules/` directory (ideally just copy/paste an existing module to retain the necessary dependencies).
1. Name the project after your effect: `clawdio-youreffect`.
1. Add the project to the Rust monorepo by adding it to the `members` array in `/modules/Cargo.toml`.

You should be good to start developing.

> If you want to test the WASM output, you'll need to add your new module to the `clawdio` library in `/packages/clawdio/`. See [using code](#using-code) below.

## Building

Build project using: `wasm-pack build --target web`

This generates a WASM build, and nice JS + TS glue files, inside the `/pkg` folder.

### Building all modules

You can build all modules using this command at the root of the project: `yarn build:modules`

## Testing

Write any tests in a `/tests/` directory inside each modules project (e.g. `/modules/moog/tests/`). You can have 1 test or multiple per file, and they can be named anything (prefer `general.rs` as a catch-all).

Run tests using `cargo test`. You can run it in the root `/modules/` directory to test all modules, or inside each modules directory to test individual modules.

You can import functions from the `test-helpers` crate to assist in testing - such as generating mock sample data.

## Using code

1. Go into [the `package.json` for the `clawdio` library](packages\clawdio\package.json) and add your new Rust module as a dependency. Make sure it matches the version in your `Cargo.toml` file - or just use `*` to signify "the latest version".
1. Run `yarn` to sync the new module.
1. Try using the module!

For testing the code in a browser, [check out the `/packages/examples/` project.](packages\examples)

### Quick Debug

You can also just install this in another app if you want to test it in isolation.

1. Build project (see above)
1. Go into build folder: `cd pkg`
1. Create a link to the module: `yarn link`
1. Go into another JS project (like a new Vite project) and link the module: `yarn link clawdio-modulename`

# References

Based on [wasm-pack-template](https://github.com/rustwasm/wasm-pack-template/tree/master) and [this guide.](rustwasm.github.io/docs/book/game-of-life/hello-world.html#build-the-project)
