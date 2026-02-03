Poems Bits 

A modern web application to read, write, and share poems. Users can explore inspiring poems, write their own, like and support content creators, and enjoy an ad-free creative experience.

Features

Read Poems: Browse poems from the community with pagination and like functionality.

Write Poems: Compose poems with rich text options (bold, italic, underline, font size).

Author Display: Publish poems under a chosen display name or your Clerk profile name.

Like/Unlike: Interact with poems and track liked poems.

Responsive Design: Works beautifully on desktop, tablet, and mobile.

Theme Toggle: Switch between light and dark mode.

Ad-Free Support: Option to donate and keep the platform ad-free.

Tech Stack

Frontend: React, Next.js, TypeScript, Tailwind CSS, Framer Motion

Authentication: Clerk (Sign In / Sign Up)

Backend / API: Next.js API Routes

Database: PostgreSQL + Prisma ORM

Deployment Ready: Fully compatible with Vercel or custom Node.js hosting

Getting Started
1. Clone the repo
git clone https://github.com/your-username/poetry-hub.git
cd poetry-hub

2. Install dependencies
npm install
# or
yarn install

3. Setup Environment Variables

Create a .env file in the root:

DATABASE_URL="postgresql://username:password@host:port/dbname"
NEXT_PUBLIC_CLERK_FRONTEND_API="your-clerk-frontend-api"
CLERK_API_KEY="your-clerk-api-key"

4. Migrate the database
npx prisma migrate dev --name init

5. Run the app
npm run dev
# or
yarn dev


Open http://localhost:3000
 to view your app.

📂 Project Structure
/app
  /api
    poem/        # API routes for poems (GET, POST)
    like/        # API route for likes
  /components    # Reusable React components
  /context       # Theme or global context (optional)
  /pages         # Pages if using pages directory
/lib
  prisma.ts      # Prisma client instance
/public
  logo.png       # Logo & assets

Scripts

npm run dev – Start the development server

npm run build – Build production files

npm run start – Start production server

npx prisma studio – Open Prisma Studio for database management

Authentication

Powered by Clerk

Sign in with email/password or third-party providers

Display name can be customized when publishing poems

Design

Modern UI with gradient highlights

Interactive toolbar for formatting poems

Responsive layout for all devices

Framer Motion animations for smooth transitions

 Future Improvements

User profiles and poem history

Commenting and community interaction

Poetry search and categories

Dark/light theme persistence

Export poems as PDF

License

This project is MIT Licensed – see the LICENSE
 file for details.
