# Isho's Gelatos & Sorbetes

Website for Isho's Gelatos & Sorbetes - El Salvador.

## 🚀 Tech Stack

- **Framework**: [Astro](https://astro.build) v5.16.6
- **Styling**: Bulma CSS Framework
- **CMS**: Decap CMS (formerly Netlify CMS)
- **Deployment**: Vercel (Serverless)
- **Icons**: Astro Icon with Iconify

## 📁 Project Structure

```
/
├── public/
│   ├── admin/          # Decap CMS configuration
│   └── uploads/        # Menu images and media files
├── src/
│   ├── assets/         # Static assets (icons, etc.)
│   ├── components/     # Astro components
│   │   ├── cards/      # Card components
│   │   ├── layout/     # Layout components (NavBar, Footer, etc.)
│   │   └── sections/   # Page sections (Hero, Menu, About, Contact)
│   ├── content/        # CMS content (menu items, locations, contact)
│   ├── layouts/        # Page layouts
│   ├── pages/          # Routes and pages
│   │   ├── admin/      # CMS admin interface
│   │   └── api/        # API routes (authentication)
│   ├── styles/         # Global styles
│   └── types/          # TypeScript type definitions
└── vercel.json         # Vercel deployment configuration
```

## 🧞 Commands

All commands are run from the root of the project:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `pnpm install`         | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |

## 📝 Content Management

Content is managed through Decap CMS, accessible at `/admin`. The CMS allows editing:

- **Menu items** (`src/content/menu/*.json`)
- **Locations** (`src/content/locations/*.json`)
- **Contact information** (`src/content/contact.json`)

Menu images are stored in `public/uploads/` and referenced in the menu JSON files.

## 🚢 Deployment

The project is configured for deployment on Vercel with serverless output. The deployment is handled automatically through the Vercel integration.

## 📄 License

Private project - All rights reserved.
