import { PrismTheme, themes as prismThemes } from "prism-react-renderer";

export const customPrismThemeLight: PrismTheme = {
  ...prismThemes.github,
  styles: [
    ...prismThemes.github.styles.map((style) => {
      // Primary color
      if (style?.style?.color?.includes("e3116c")) {
        style.style.color = "var(--clawdio-800)";
      }
      return style;
    }),
  ],
};
export const customPrismThemeDark: PrismTheme = {
  ...prismThemes.synthwave84,
  plain: {
    ...prismThemes.synthwave84.plain,
    color: "var(--colors-text)",
    backgroundColor:
      "linear-gradient(to bottom, var(--gray-1) 75%, var(--gray-2))",
  },
  styles: [
    ...prismThemes.synthwave84.styles.map((style) => {
      // Text color
      if (style?.style?.color?.includes("f92aad")) {
        style.style.color = "var(--colors-text)";
      }
      // Primary color
      if (style?.style?.color?.includes("f87c32")) {
        style.style.color = "var(--clawdio-1000-brand)";
      }
      // Functions
      // These were just too "white" so we just add color back
      if (style?.style?.color?.includes("fdfdfd")) {
        style.style.color = "#0091FF";
        // style.style.textShadow =
        //   "rgb(0, 23, 22) 0px 0px 2px, rgba(3, 237, 249, 0.26) 0px 0px 3px, rgba(3, 237, 249, 0.16) 0px 0px 5px, rgba(3, 237, 249, 0.16) 0px 0px 8px";
        style.style.textShadow = "none";
      }
      // Keywords
      if (style?.style?.color?.includes("f4eee4")) {
        style.style.color = "var(--clawdio-1000-brand)";
        // style.style.textShadow =
        //   "rgb(57, 58, 51) 0px 0px 2px, rgba(243, 83, 5, 0.46) 0px 0px 8px, rgba(243, 83, 5, 0.46) 0px 0px 2px";
        style.style.textShadow = "none";
      }
      if (style?.style?.color?.includes("8e8e8e")) {
        style.style.textShadow =
          "rgb(16, 12, 15) 0px 0px 2px, rgba(73, 84, 149, 0.2) 0px 0px 5px, rgba(73, 84, 149, 0.2) 0px 0px 10px";
      }

      return style;
    }),
  ],
};
