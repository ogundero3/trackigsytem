# ShipStream - Enterprise Shipment Tracking System

A professional, real-time shipment tracking platform built with Next.js, TypeScript, and Tailwind CSS. Features real-time progress updates, email-based tracking ID system, and an advanced animated logo.

## 🚀 Features

- **Real-Time Tracking**: Live 30-second polling updates for shipment status
- **Progressive Updates**: 25% → 50% → 75% tracking progression
- **Email-Based Tracking IDs**: 
  - SHP-928371
  - SS-2026-4839
- **Professional UI**: Enterprise-grade design with no emojis
- **Animated Logo**: Advanced ShipStream logo with Framer Motion animations
- **Mobile Responsive**: Perfect layout on all device sizes
- **Error Alerts**: Professional error handling with support contact information
- **Fully Responsive**: Works seamlessly on mobile, tablet, and desktop

## 🛠️ Tech Stack

- **Framework**: Next.js 14.2.3
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **API Routes**: Next.js API routes for backend
- **Deployment**: Netlify

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/ogundero3/trackigsytem.git

# Navigate to project directory
cd trackigsytem

# Install dependencies
npm install

# Run development server
npm run dev
```

The application will be available at `http://localhost:3000`

## 📝 Project Structure

```
src/
├── app/
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Landing page
│   ├── track/
│   │   └── page.tsx          # Tracking detail page
│   └── api/
│       └── track/
│           └── route.ts      # Tracking API endpoint
├── components/
│   ├── Clock.tsx             # Time display component
│   ├── Logo.tsx              # Animated company logo
│   ├── Timeline.tsx          # Shipment timeline visualization
│   └── TrackClient.tsx       # Tracking data client component
```

## 🔑 Test Tracking IDs

Try these tracking IDs to see the system in action:

- **SHP-928371** - Full demo shipment
- **SS-2026-4839** - Full demo shipment

**Note**: Demo tracks progress at 25% → 50% → 75%, with error alert after 6 minutes for testing purposes.

## 🎨 Design Features

### Animated Logo
- Advanced ShipStream typography logo
- Two flowing "S" curves representing the company name
- Animated stream arrows and flowing lines
- Gold & blue premium gradient colors
- Framer Motion animations with multiple elements

### Responsive Design
- Mobile-first approach using Tailwind CSS
- Breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px)
- Perfect layout arrangements on all screen sizes
- No content squeezing on mobile devices

### Professional Appearance
- Enterprise-grade UI with no emojis
- Dark navy backgrounds with gold accents
- Clear typography hierarchy
- Smooth animations and transitions

## 📊 API Endpoints

### GET /api/track
Fetch shipment tracking information

**Query Parameters:**
- `id` - Tracking ID (e.g., `SHP-928371`)

**Response:**
```json
{
  "id": "SHP-928371",
  "status": "Out for Delivery",
  "currentStep": 3,
  "progress": 75,
  "estimatedDelivery": "2026-05-13T18:00:00Z",
  "events": [
    {
      "step": 1,
      "title": "Order Confirmed",
      "timestamp": "2026-05-11T00:00:00Z"
    },
    ...
  ],
  "hasError": false,
  "errorMessage": null
}
```

## 🚀 Deployment

### Netlify

This project is optimized for Netlify deployment:

1. **Connect Repository**
   - Push code to GitHub
   - Visit https://app.netlify.com
   - Click "New site from Git"
   - Connect GitHub account
   - Select `trackigsytem` repository

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18 (or higher)

3. **Environment Variables**
   - No environment variables required for basic functionality

4. **Deploy**
   - Netlify will automatically deploy on every push to main branch

**Live URL**: Will be provided by Netlify after deployment

## 📱 Mobile Optimization

The application is fully optimized for mobile devices:

- **Viewport**: Properly configured for all devices
- **Touch-Friendly**: Large interactive elements
- **Responsive Images**: SVG logos scale perfectly
- **Network**: Optimized for 4G/5G networks
- **Performance**: Fast load times with Next.js optimization

## 🔒 Security

- **API Protection**: Server-side tracking ID validation
- **CORS**: Configured for same-origin requests only
- **Input Validation**: Tracking ID format validation
- **No Sensitive Data**: Demo data only, no real payment info

## 📞 Support

For issues or questions:
- Email: support@shipstream.com
- Phone: 1-800-744-7878
- Live Chat: 24/7 Available

## 📄 License

This project is proprietary software. All rights reserved.

## 👨‍💻 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### Code Quality

- TypeScript for type safety
- ESLint for code quality
- Tailwind CSS for consistent styling
- Framer Motion for smooth animations

## 🎯 Future Enhancements

- Real API integration with logistics providers
- User authentication and accounts
- Historical tracking data
- Multi-language support
- SMS notifications
- Real-time GPS tracking
- Advanced analytics dashboard
- Admin panel for shipment management

---

**ShipStream** - Professional Real-Time Shipment Tracking System
