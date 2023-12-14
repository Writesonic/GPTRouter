// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: "GPTRouter - The Ultimate Model Router for GPT and AI Models | Writesonic",
    tagline: "GPTRouter: AI Unleashed, Model Switching Perfected!",
    url: "https://gpt-router.writesonic.com",
    baseUrl: "/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    favicon: "https://d1q5p2nadm4152.cloudfront.net/public/images/favicon.ico",
    organizationName: "Writesonic", 
    projectName: "GPT-Router", 

    scripts: [{src: 'https://plausible.io/js/script.js', defer: true, 'data-domain': 'gpt-router.writesonic.com'}],
    themes: [
        [
          // @ts-ignore
          require.resolve("@easyops-cn/docusaurus-search-local"),
          /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
        //   @ts-ignore
          ({
            hashed: true,
            language: ["en"],
          }),
        ],
      ],
    plugins: [
        async function myPlugin(context, options) {
          return {
            name: "docusaurus-tailwindcss",
            configurePostCss(postcssOptions) {
              // Appends TailwindCSS and AutoPrefixer.
              postcssOptions.plugins.push(require("tailwindcss"));
              postcssOptions.plugins.push(require("autoprefixer"));
              return postcssOptions;
            },
          };
        },
      ],
      
    
    presets: [
        [
            "docusaurus-preset-openapi",
            /** @type {import('docusaurus-preset-openapi').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve("./sidebars.js"),
                    // Please change this to your repo.
                    editUrl:
                        "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    editUrl:
                        "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
                },
                theme: {
                    customCss: require.resolve("./src/css/custom.css"),
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('docusaurus-preset-openapi').ThemeConfig} */
        ({
            navbar: {
                logo: {
                    alt: "My Site Logo",
                    src: "https://d1q5p2nadm4152.cloudfront.net/public/images/logo.svg",
                },
                items: [
                    // {
                    //     type: "doc",
                    //     docId: "intro",
                    //     position: "left",
                    //     label: "Tutorial",
                    // },
                    { to: "/docs", label: "Docs", position: "left" },
                    // { to: "/api", label: "API", position: "left" },
                    // { to: "/blog", label: "Blog", position: "left" },
                    {
                        href: "https://github.com/Writesonic",
                        label: "GitHub",
                        position: "right",
                    },
                ],
            },
            footer: {
                style: "dark",
                links: [
                    {
                        title: "Docs",
                        items: [
                            {
                                label: "API",
                                to: "/api",
                            },
                        ],
                    },
                    {
                        title: "Community",
                        items: [
                            {
                                label: "Twitter",
                                href: "https://twitter.com/WriteSonic",
                            },
                        ],
                    },
                    {
                        title: "More",
                        items: [
                            // {
                            //     label: "Blog",
                            //     to: "/blog",
                            // },
                            {
                                label: "GitHub",
                                href: "https://github.com/Writesonic",
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
        }),
};

module.exports = config;
