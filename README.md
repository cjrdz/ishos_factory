# Isho's Gelatos & Sorbetes

Website for Isho's Gelatos & Sorbetes - El Salvador. A modern website showcasing menu items, locations, and contact information with an easy-to-use content management system.

## 🚀 Tech Stack

- **Astro** v5.16.6 - Static site generator
- **Bulma CSS** - Styling framework
- **Decap CMS** - Content management system
- **Vercel** - Hosting and deployment
- **TypeScript** - Type safety

## 📁 Project Structure

```
/
├── public/
│   ├── admin/          # CMS configuration
│   └── uploads/        # Menu images
├── src/
│   ├── components/     # Astro components
│   │   ├── cards/      # Card components
│   │   ├── layout/     # NavBar, Footer, etc.
│   │   └── sections/   # Hero, Menu, About, Contact
│   ├── content/        # CMS content (JSON files)
│   │   ├── menu/       # Menu categories
│   │   ├── locations/  # Store locations
│   │   └── contact.json
│   ├── pages/          # Routes
│   │   ├── index.astro # Homepage
│   │   └── api/        # API routes (CMS auth)
│   └── styles/         # Global CSS
```

## 🧞 Commands

| Command        | Action                                    |
| :------------- | :---------------------------------------- |
| `pnpm install` | Install dependencies                      |
| `pnpm dev`     | Start dev server at `localhost:4321`     |
| `pnpm build`   | Build for production                     |
| `pnpm preview` | Preview production build                 |

## 📝 Content Management

Content is managed through **Decap CMS** at `/admin`. You can edit:

- **Menu items** - Categories, images, and order
- **Locations** - Store locations with maps
- **Contact info** - Phone, hours, address, social media

All content is stored as JSON files in `src/content/`.

## 🚢 Deployment

Deployed on **Vercel** at: `https://ishos-factory.vercel.app`

Deployment is automatic via GitHub integration.

## 📄 License

Personal project - All rights reserved.
