# AI Agent First Blogging Platform

A minimalist, modern blogging platform with integrated AI assistance for content creation and optimization.

## Features

- **Minimalist Design**: Clean, focused reading experience that puts content first
- **AI-Powered Content**: Leverage AI to enhance your blogging workflow and content quality
- **SEO Optimization**: AI tools analyze your content and suggest improvements for better search engine visibility
- **Modern Stack**: Built with Next.js, TypeScript, and Tailwind CSS

## Pages

- **Journal (Homepage)**: Main blog listing with a clean, minimal design
- **Archive**: Chronological archive of all blog posts organized by month
- **Blog Posts**: Individual blog post pages with a focus on readability
- **Admin Dashboard**: Content management interface with AI assistance

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Typography**: @tailwindcss/typography

## Project Structure

```
src/
├── app/
│   ├── admin/
│   │   └── page.tsx         # Admin dashboard
│   ├── archive/
│   │   └── page.tsx         # Archive page
│   ├── blog/
│   │   └── [id]/
│   │       └── page.tsx     # Individual blog post page
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage (Journal)
```

## License

This project is open source and available under the [MIT License](LICENSE). 