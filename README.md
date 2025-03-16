# Personal Blog

A minimalist personal blog built with Next.js, TypeScript, and Supabase.

## Features

- **Homepage**: Clean, minimal list of blog posts
- **Blog Posts**: Typography-focused article pages
- **Admin**: Secure admin interface for content management
- **Authentication**: Supabase authentication
- **Database**: Supabase PostgreSQL database
- **Markdown**: Full markdown support for blog posts

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase
- Markdown

## Project Structure

```
src/
├── app/
│   ├── admin/
│   │   └── page.tsx         # Admin dashboard
│   ├── auth/
│   │   └── callback/        # Auth callback handling
│   ├── blog/
│   │   └── [id]/
│   │       └── page.tsx     # Blog post page
│   ├── api/                 # API routes
│   └── page.tsx             # Homepage
├── components/              # React components
├── lib/                     # Utility functions
└── types/                   # TypeScript types
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Development

- **Code Style**: Uses ESLint and Prettier
- **Git Flow**: Feature branches and pull requests
- **Testing**: Jest and React Testing Library

## Deployment

The site is deployed on Vercel with automatic deployments from the main branch.

## License

MIT 