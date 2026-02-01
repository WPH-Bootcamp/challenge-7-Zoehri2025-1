# Setup Instructions

## Environment Variables

Buat file `.env.local` di root project dengan konten berikut:

```env
NEXT_PUBLIC_API_BASE_URL=https://be-restaurant-api-889893107835.asia-southeast2.run.app
```

**Catatan:** File `.env.local` tidak di-commit ke git (sudah di-ignore). Gunakan `.env.example` sebagai template.

## Install Dependencies

Jalankan perintah berikut untuk menginstall semua dependencies yang diperlukan:

```bash
npm install
```

Dependencies yang akan diinstall:
- `@reduxjs/toolkit` - State management untuk client/UI state
- `react-redux` - React bindings untuk Redux
- `@tanstack/react-query` - Server state management
- `axios` - HTTP client
- `dayjs` - Date/time formatting
- `clsx` - Utility untuk className
- `tailwind-merge` - Utility untuk merge Tailwind classes

## Setup shadcn/ui

Setelah dependencies terinstall, setup shadcn/ui dengan menjalankan:

```bash
npx shadcn@latest init
```

Kemudian install komponen yang diperlukan:

```bash
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add card
npx shadcn@latest add dialog
```

## Project Structure

Struktur project sudah disiapkan sesuai rekomendasi:

```
├─ app/              # Next.js App Router
├─ pages/            # Page-level components (akan dibuat)
├─ features/         # Feature-based modules
│  ├─ cart/          # Cart Redux slice & hooks
│  └─ filters/       # Filters Redux slice & hooks
├─ components/       # Reusable UI components
├─ ui/               # shadcn/ui components
├─ services/         # API & business logic
│  ├─ api/           # Axios instance
│  └─ queries/       # React Query hooks
├─ types/            # TypeScript type definitions
├─ lib/              # Utility functions
├─ config/           # Configuration files
└─ providers/        # React context providers
```

## Running the App

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

## Next Steps

1. Install dependencies: `npm install`
2. Setup shadcn/ui components
3. Buat file `.env.local` dengan API base URL
4. Mulai development sesuai dengan Figma design
