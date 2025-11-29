# News Website

A modern Next.js news website with responsive design and multiple data sources.

## Features

- **Next.js Framework**: Built with Next.js 15 for optimal performance
- **Multiple Data Sources**: Fetches data from various news APIs
- **Static Generation**: Uses Next.js static generation for fast loading
- **Responsive Design**: Mobile-friendly news website
- **SEO Optimized**: Proper meta tags and structured data

## Setup

### Prerequisites

- **Node.js** (v18 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd zaira-v1.3
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── news-details/    # News detail pages
│   ├── blog/           # Blog pages
│   └── layout.tsx      # Root layout
├── components/         # React components
│   ├── blogs/         # Blog-related components
│   ├── common/        # Shared components
│   └── homes/         # Homepage components
├── data/              # Static data files
├── layouts/           # Layout components
└── styles/            # Global styles
```

## API Integration

The application integrates with multiple news APIs:

- News API (`/api/news/public`)
- Subnews API (`/api/subnews/public`)
- Mini News API (`/api/mini_news/public`)
- Trending News API (`/api/trending_news/public`)
- Main News API (`/api/main_news/public`)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
