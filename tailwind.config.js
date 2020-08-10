const defaultTheme = require("tailwindcss/defaultTheme");
const mdx = require("@mdx-js/mdx");

module.exports = {
  purge: {
    mode: "all",
    content: ["./src/**/*.{js,mdx}", "./next.config.js"],
    options: {
      whitelist: [
        "text-code-red",
        "text-code-yellow",
        "text-code-green",
        "text-code-red",
        "text-code-green",
        "text-code-white",
        "text-code-purple",
        "text-code-green",
        "text-code-blue",
        "text-code-red",
        "text-gray-400",
        "italic",
      ],
      extractors: [
        {
          extensions: ["mdx"],
          extractor: (content) => {
            content = mdx.sync(content);

            // Capture as liberally as possible, including things like `h-(screen-1.5)`
            const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];

            // Capture classes within other delimiters like .block(class="w-1/2") in Pug
            const innerMatches =
              content.match(/[^<>"'`\s.(){}[\]#=%]*[^<>"'`\s.(){}[\]#=%:]/g) ||
              [];

            return broadMatches.concat(innerMatches);
          },
        },
      ],
    },
  },
  theme: {
    extend: {
      lineHeight: {
        "11": "2.75rem",
        "12": "3rem",
        "13": "3.25rem",
        "14": "3.5rem",
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        code: {
          green: "#b5f4a5",
          yellow: "#ffe484",
          purple: "#d9a9ff",
          red: "#ff8383",
          blue: "#93ddfd",
          white: "#fff",
        },
      },
      typography: (theme) => ({
        default: {
          css: {
            img: {
              borderRadius: theme("borderRadius.md"),
            },
            video: {
              borderRadius: theme("borderRadius.md"),
              marginRight: "auto",
              marginLeft: "auto",
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.gray.300"),
            ".lead": {
              color: theme("colors.gray.300"),
            },
            a: {
              color: theme("colors.gray.100"),
            },
            strong: {
              color: theme("colors.gray.100"),
            },
            "ol > li::before": {
              color: theme("colors.gray.400"),
            },
            "ul > li::before": {
              backgroundColor: theme("colors.gray.400"),
            },
            hr: {
              borderColor: theme("colors.gray.700"),
            },
            blockquote: {
              color: theme("colors.gray.100"),
              borderLeftColor: theme("colors.gray.700"),
            },
            h1: {
              color: theme("colors.gray.100"),
            },
            h2: {
              color: theme("colors.gray.100"),
            },
            h3: {
              color: theme("colors.gray.100"),
            },
            h4: {
              color: theme("colors.gray.100"),
            },

            "figure figcaption": {
              color: theme("colors.gray.400"),
            },
            code: {
              color: theme("colors.gray.100"),
            },
            thead: {
              color: theme("colors.gray.100"),
              borderBottomColor: theme("colors.gray.600"),
            },
            "tbody tr": {
              borderBottomColor: theme("colors.gray.700"),
            },
          },
        },
      }),
    },
  },
  variants: {},
  plugins: [
    require("@tailwindcss/ui"),
    require("@tailwindcss/typography"),
    function ({ addBase, addComponents, theme }) {
      addBase([
        {
          "@font-face": {
            fontFamily: "Inter var",
            fontWeight: "100 900",
            fontStyle: "normal",
            fontNamedInstance: "Regular",
            fontDisplay: "swap",
            src:
              'url("/fonts/Inter-roman.var-latin.woff2?3.13") format("woff2")',
          },
        },
        {
          "@font-face": {
            fontFamily: "Inter var",
            fontWeight: "100 900",
            fontStyle: "italic",
            fontNamedInstance: "Italic",
            fontDisplay: "swap",
            src:
              'url("/fonts/Inter-italic.var-latin.woff2?3.13") format("woff2")',
          },
        },
      ]);
    },
  ],
};
