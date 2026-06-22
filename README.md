# ahmad-zenka.vercel.app

You're reading the README for a portfolio. The portfolio itself is one of the projects listed inside the portfolio. Yes, that card you see on the live site that says *"you're looking at it"* — this is the source code for that.

## What this actually is

Not a template. Not a static HTML page someone reskinned. A full-stack web application with a headless CMS, built from scratch — where every section you see on the live site (projects, skills, credentials, gallery, bio) is managed through a password-protected admin panel without ever touching this codebase.

Add a project? Admin panel. Upload a gallery photo? Admin panel, straight to Cloudinary with auto-compression. Edit the bio? Admin panel. The live site reflects it immediately via `revalidatePath`.

The fact that recruiters can see it updating in real time is kind of the point.

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL via Supabase |
| ORM | Prisma 7 |
| Auth | NextAuth v5 (Auth.js) — JWT strategy |
| Image hosting | Cloudinary (with `f_auto` + `q_auto` delivery) |
| Animations | Motion (Framer Motion v12) |
| UI components | shadcn/ui, Aceternity UI, Lucide, Tabler Icons |
| Deployment | Vercel |

## Features

- **Dynamic CMS** — all content is database-driven, editable from an admin panel
- **Cloudinary image pipeline** — uploads are auto-resized and compressed; served as WebP/AVIF to modern browsers
- **Project carousel** — auto-advancing image carousel per project card
- **Gallery with auto-carousel** — featured + thumbnail strip, advances on interval, clickable
- **Responsive** — mobile-first layout, floating dock navbar that works at all screen sizes
- **Protected routes** — admin is secured via `proxy.ts` (Next.js 16 equivalent of middleware) + JWT session

## Admin

There is one. It's protected. You won't find it by guessing common paths — or maybe you will, but you still won't get in without credentials.

## About the developer

Biology graduate turned full-stack developer. Published marine ecology research background, orchestral percussionist, and now building web applications with the same discipline required for a two-hour concert with a 60-piece orchestra — preparation, precision, and no room for last-minute panics.

Currently open to work. [`linkedin.com/in/jutrzenka`](https://linkedin.com/in/jutrzenka)
