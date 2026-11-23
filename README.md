<!-- This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. -->



# 💍 Wedora – Wedding Planning Platform

Wedora is a full-stack wedding planning platform designed to make wedding planning easier and more convenient. It connects customers with professional wedding service providers, allowing customers to explore services, book vendors, and manage their bookings. Vendors can manage their services, handle booking requests, and upgrade their subscriptions.

## ✨ Important Features

- **User Authentication:** Secure registration and login with role-based access for customers, vendors, and administrators.
- **Browse Wedding Services:** Explore approved wedding services and view detailed service information.
- **Service Management:** Vendors can add, update, and delete their wedding services.
- **Booking Management:** Customers can book services, while vendors can accept or reject booking requests.
- **Customer Dashboard:** Customers can manage bookings and update their profiles.
- **Vendor Dashboard:** Vendors can manage services, booking requests, and business profiles.
- **Subscription System:** Vendors can choose the Basic plan or upgrade to Premium.
- **Stripe Integration:** Secure Premium subscription payments using Stripe Checkout and webhook verification.
- **Admin Dashboard:** Administrators can manage users, services, and transactions.
- **Responsive Design:** User-friendly interface optimized for desktop, tablet, and mobile devices.

## 🛠️ Technology Stack

### Frontend
- Next.js
- React
- JavaScript
- Tailwind CSS
- Shadcn UI
- DaisyUI
- Framer Motion
- Lucide React
- Better Auth
- Sonner

### Backend
- Node.js
- Express.js
- MongoDB
- Better Auth
- Stripe

### Additional Services
- Stripe – Payment processing
- ImgBB – Image hosting
- Vercel – Deployment

## ⚙️ Installation Instructions

### Prerequisites

- Node.js and npm
- MongoDB database
- Stripe account
- ImgBB API key

### 1. Clone the Client Repository

```bash
git clone https://github.com/pranta77/Wedora-Website-Client.git
cd Wedora-Website-Client
npm install
```

### 2. Clone the Server Repository

```bash
git clone https://github.com/pranta77/Wedora-Website-Server.git
cd Wedora-Website-Server
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the client project:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

Create a `.env` file in the server project:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:5000
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
STRIPE_PREMIUM_PRICE_ID=your_stripe_premium_price_id
```

**Important:** Replace the placeholder values with your own credentials. Never commit environment files or expose secret keys publicly.

### 4. How to Run the Project Locally

**Start the Backend:**

```bash
cd Wedora-Website-Server
npm run dev
```

**Start the Frontend:**

Open another terminal:

```bash
cd Wedora-Website-Client
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

Make sure MongoDB is connected and the backend is running before using the application.

## 🌐 Live Website

**[Visit Wedora – Wedding Planning Platform](https://wedora-client.vercel.app/)**

## 📂 Repository Links

- **Client Repository:** [Wedora Website Client](https://github.com/pranta77/Wedora-Website-Client)
- **Server Repository:** [Wedora Website Server](https://github.com/pranta77/Wedora-Website-Server)
