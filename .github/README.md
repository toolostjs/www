# Toolost SDK Documentation

This folder contains the VitePress documentation website for the Toolost JavaScript and TypeScript SDK.

## Local Development

1. Install dependencies:
   ```bash
   pnpm install
   ```
2. Start the docs dev server:
   ```bash
   pnpm dev
   ```
3. Open the local URL shown in the terminal.

## Structure

- `.vitepress/` - VitePress configuration and theme files
- `en/` - English docs content
- `de/` - German docs content
- `public/` - static assets for docs pages

## Contribution Notes

- Keep English and German pages aligned whenever possible.
- Use clear headings and runnable code snippets.
- Prefer internal relative links for docs navigation.
- Verify the site builds before opening a pull request.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for docs-specific workflow notes.
