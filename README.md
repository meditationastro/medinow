..# Answerforself - Spiritual Guidance Platform........
..
A modern web application for meditation guidance, astrological insights, and spiritual counseling built with Next.js 14, TypeScript, Tailwind CSS, and Prisma.

## Features 

- 🧘 Meditation and Spiritual Guidance
- 🌟 Astrological Readings
- 📝 Blog Management System
- 🖼️ Gallery Management
- 📞 Contact Form with Admin Dashboard
- 🛒 Product/Service Listings
- 🔐 Secure Authentication
- 📱 Responsive Design

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js
- **Email Service:** Resend
- **File Storage:** Cloudflare R2
- **UI Components:** Shadcn/ui
- **Rich Text Editor:** TipTap
- **Form Handling:** React Hook Form
- **Validation:** Zod

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ 
- PostgreSQL
- npm or yarn

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/meditationastro.git
cd meditationastro
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/meditationastro"

# Authentication
AUTH_SECRET="your-auth-secret"

# Email Service (Resend)
RESEND_API_KEY="your-resend-api-key"
RESEND_FROM_EMAIL="noreply@yourdomain.com"
RESEND_TO_EMAIL="admin@yourdomain.com"

# WhatsApp Integration
WHATSAPP_NUMBER="your-whatsapp-number"

# Cloudflare R2 Storage
R2_ACCESS_KEY_ID="your-r2-access-key"
R2_SECRET_ACCESS_KEY="your-r2-secret-key"
R2_ACCOUNT_ID="your-r2-account-id"
R2_BUCKET_NAME="your-bucket-name"
R2_PUBLIC_URL="your-r2-public-url"

# Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

4. Initialize the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.






## Features in Detail

### Authentication
- Email/Password authentication
- Admin role management
- Protected routes
- Password reset functionality

### Blog System
- Rich text editor
- Image uploads
- Categories and tags
- Draft/publish functionality

### Contact Management
- Form submissions
- Admin dashboard
- Status tracking
- Export functionality

### File Storage
- Image upload to Cloudflare R2
- Automatic optimization
- Secure access control

## Thank you.
