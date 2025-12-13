# VezxTech - Professional Website Builder for Local Shops

A complete MERN-stack solution for creating modern websites for local businesses like clinics, electronics stores, salons, and boutiques.

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Image Storage**: Cloudinary
- **Maps**: Mapbox
- **Deployment**: Vercel (Frontend) + Render (Backend)

## 📁 Project Structure

```
vezxtech/
├── web/          # Next.js frontend
├── server/       # Express backend
└── shared/       # Shared utilities
```

## 🎨 Design System

### Color Palette A
- Primary Blue: `#2563EB`
- Secondary Indigo: `#4F46E5`
- Accent Aqua: `#14B8A6`
- Light Background: `#F3F4F6`
- Text Dark: `#1F2937`
- Text Light: `#4B5563`

### Typography
- **Headings**: Poppins
- **Body**: Inter

## 🛠 Installation

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Cloudinary account
- Git

### Setup

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd vezxtech
```

2. **Install dependencies**
```bash
npm install
cd web && npm install
cd ../server && npm install
```

3. **Configure environment variables**

Create `.env.local` in `/web`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
```

Create `.env` in `/server`:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

4. **Run development servers**
```bash
# From root directory
npm run dev

# Or run separately
npm run dev:web    # Frontend on http://localhost:3000
npm run dev:server # Backend on http://localhost:5000
```

## 📦 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Set root directory to `web`
4. Add environment variables
5. Deploy

### Backend (Render)

1. Create new Web Service on Render
2. Connect GitHub repository
3. Set root directory to `server`
4. Add environment variables
5. Deploy

## 🌟 Features

- 🎨 Modern, premium design
- 📱 Fully responsive
- ⚡ Fast page loads
- 🔍 SEO optimized
- 📊 Admin dashboard
- 🗺️ Google Maps integration
- 💬 WhatsApp integration
- 📸 Image gallery
- 📝 Contact forms
- 💳 Pricing tiers
- 🎨 Multiple templates

## 📄 License

MIT License - feel free to use for your projects!

## 👥 Team

Built by the VezxTech team - two students passionate about digitizing local businesses.
