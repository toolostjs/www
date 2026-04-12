import {
  defineConfig,
  resolveSiteDataByRoute,
  type HeadConfig,
} from "vitepress";
import { readFileSync } from "node:fs";
import { groupIconMdPlugin } from "vitepress-plugin-group-icons";

const prod = !!process.env.NETLIFY;
const packageJSON = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
) as { version?: string };

const latestVersion = packageJSON.version ? `v${packageJSON.version}` : "v1.x";

const repositoryURL = "https://github.com/toolostjs/toolost";
const docsURL = "https://toolost.js.org";

export default function () {
  return defineConfig({
    rewrites: {
      "en/:rest*": ":rest*",
    },
    title: "Toolost SDK",
    description:
      "Type-safe JavaScript and TypeScript SDK for the Too Lost Developer API.",
    lang: "en-US",
    lastUpdated: true,
    cleanUrls: true,
    sitemap: { hostname: docsURL },
    appearance: true,
    markdown: {
      lineNumbers: true,
      config(md) {
        const fence = md.renderer.rules.fence!;
        md.renderer.rules.fence = function (tokens, idx, options, env, self) {
          const locale = (env as { locale?: string }).locale || "en";
          const isGerman = locale === "de";
          const codeCopyButtonTitle = isGerman ? "Code kopieren" : "Copy code";
          return fence(tokens, idx, options, env, self).replace(
            '<button title="Copy Code" class="copy"></button>',
            `<button title="${codeCopyButtonTitle}" class="copy"></button>`,
          );
        };
        md.use(groupIconMdPlugin);
      },
    },
    head: [
      [
        "link",
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/toolost-sdk-logo.svg",
        },
      ],
      ["meta", { name: "theme-color", content: "#0f766e" }],
      ["meta", { property: "og:type", content: "website" }],
      ["meta", { property: "og:site_name", content: "Toolost SDK" }],
      ["meta", { property: "og:url", content: `${docsURL}/` }],
    ],
    themeConfig: {
      logo: "/toolost-sdk-logo.svg",
      editLink: {
        pattern: `${repositoryURL}/edit/main/www/:path`,
        text: "Edit this page on GitHub",
      },
      socialLinks: [{ icon: "github", link: repositoryURL }],
      footer: {
        message: "Released under the MIT License. Not affiliated with Too Lost.",
        copyright:
          "Copyright (c) 2026-present TooLostJS Maintainers and Contributors",
      },
      search: { provider: "local" },
    },
    locales: {
      root: {
        label: "English",
        lang: "en-US",
        title: "Toolost SDK",
        description:
          "Type-safe JavaScript and TypeScript SDK for the Too Lost Developer API.",
        themeConfig: {
          nav: [
            {
              text: "Guide",
              link: "/guide/",
              activeMatch: "/guide/",
            },
            {
              text: "API Reference",
              link: "/api/",
              activeMatch: "/api/",
            },
            {
              text: "Developers",
              link: "https://toolost.com/developers",
            },
            {
              text: latestVersion,
              items: [
                {
                  text: "Releases",
                  link: `${repositoryURL}/releases`,
                },
                {
                  text: "NPM Package",
                  link: "https://www.npmjs.com/package/toolost",
                },
                {
                  text: "Contribution Guide",
                  link: `${repositoryURL}/blob/main/CONTRIBUTING.md`,
                },
              ],
            },
          ],
          sidebar: {
            "/guide/": [
              {
                text: "Guide",
                link: "/guide/",
                collapsed: false,
                items: [
                  { text: "Getting Started", link: "/guide/getting-started" },
                  { text: "Architecture", link: "/guide/architecture" },
                  { text: "Type System", link: "/guide/type-system" },
                  {
                    text: "Events, Errors, and Retries",
                    link: "/guide/events-errors-retries",
                  },
                  {
                    text: "Testing and Quality",
                    link: "/guide/testing-and-quality",
                  },
                  { text: "Roadmap", link: "/guide/roadmap" },
                ],
              },
            ],
            "/api/": [
              {
                text: "API Reference",
                items: [
                  { text: "Overview", link: "/api/" },
                  { text: "Public API Surface", link: "/api/public-api" },
                  { text: "Client Reference", link: "/api/client-reference" },
                  { text: "OAuth Reference", link: "/api/oauth-reference" },
                  { text: "Manager Reference", link: "/api/manager-reference" },
                  { text: "Endpoint Matrix", link: "/api/endpoint-matrix" },
                ],
              },
            ],
          },
        },
      },
      de: {
        label: "Deutsch",
        lang: "de-DE",
        title: "Toolost SDK",
        description:
          "Typsicheres JavaScript- und TypeScript-SDK fuer die Too Lost Developer API.",
        themeConfig: {
          nav: [
            {
              text: "Anleitung",
              link: "/de/guide/",
              activeMatch: "/de/guide/",
            },
            {
              text: "API Referenz",
              link: "/de/api/",
              activeMatch: "/de/api/",
            },
            {
              text: "Developer Portal",
              link: "https://toolost.com/developers",
            },
            {
              text: latestVersion,
              items: [
                {
                  text: "Releases",
                  link: `${repositoryURL}/releases`,
                },
                {
                  text: "NPM Paket",
                  link: "https://www.npmjs.com/package/toolost",
                },
                {
                  text: "Mitwirken",
                  link: `${repositoryURL}/blob/main/CONTRIBUTING.md`,
                },
              ],
            },
          ],
          sidebar: {
            "/de/guide/": [
              {
                text: "Anleitung",
                link: "/de/guide/",
                collapsed: false,
                items: [
                  { text: "Schnellstart", link: "/de/guide/getting-started" },
                  { text: "Architektur", link: "/de/guide/architecture" },
                  { text: "Typsystem", link: "/de/guide/type-system" },
                  {
                    text: "Events, Fehler und Retries",
                    link: "/de/guide/events-errors-retries",
                  },
                  {
                    text: "Tests und Qualitaet",
                    link: "/de/guide/testing-and-quality",
                  },
                  { text: "Roadmap", link: "/de/guide/roadmap" },
                ],
              },
            ],
            "/de/api/": [
              {
                text: "API Referenz",
                items: [
                  { text: "Ueberblick", link: "/de/api/" },
                  {
                    text: "Oeffentliche API Oberflaeche",
                    link: "/de/api/public-api",
                  },
                  { text: "Client Referenz", link: "/de/api/client-reference" },
                  { text: "OAuth Referenz", link: "/de/api/oauth-reference" },
                  {
                    text: "Manager Referenz",
                    link: "/de/api/manager-reference",
                  },
                  { text: "Endpoint Matrix", link: "/de/api/endpoint-matrix" },
                ],
              },
            ],
          },
        },
      },
    },
    transformPageData: prod
      ? (pageData, ctx) => {
          const site = resolveSiteDataByRoute(
            ctx.siteConfig.site,
            pageData.relativePath,
          );
          const title = `${pageData.title || site.title} | ${pageData.description || site.description}`;
          ((pageData.frontmatter.head ??= []) as HeadConfig[]).push(
            ["meta", { property: "og:locale", content: site.lang }],
            ["meta", { property: "og:title", content: title }],
          );
        }
      : undefined,
  });
}
