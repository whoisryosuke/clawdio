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
      "linear-gradient(to bottom, var(--gray-2) 75%, var(--gray-3))",
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
      return style;
    }),
  ],
};

console.log("dark theme", customPrismThemeDark);

customPrismThemeDark.styles.forEach((style) =>
  console.log("style", style.style)
);
