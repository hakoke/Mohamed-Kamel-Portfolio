# Mohamed Kamel - Portfolio

Personal portfolio website showcasing my projects and skills as a full-stack developer.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Railway

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/hakoke/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## Deployment on Railway

1. Create a new project on [Railway](https://railway.app)
2. Connect your GitHub repository
3. Railway will automatically detect the Next.js app and deploy it
4. Your site will be live at the provided Railway URL

### Manual Railway CLI Deployment

```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

## Project Structure

```
├── app/                # Next.js app directory
│   ├── layout.tsx     # Root layout
│   ├── page.tsx       # Home page
│   └── globals.css    # Global styles
├── components/        # React components
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Skills.tsx
│   └── Contact.tsx
└── public/           # Static assets
```

## Customization

### Update Projects

Edit the `projects` array in `components/Projects.tsx` to add/update your projects.

### Update Skills

Modify the `skillCategories` in `components/Skills.tsx` to reflect your skills.

### Change Theme Colors

Update colors in `tailwind.config.ts` and `app/globals.css`.

### Update Contact Info

Change email and social links in `components/Contact.tsx` and `components/Hero.tsx`.

## License

MIT

## Contact

- GitHub: [@hakoke](https://github.com/hakoke)
- Portfolio: [Your Railway URL]

