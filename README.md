# Gurukulam Global School Website

![Gurukulam Global School](public/logo.png)

A modern, responsive website for Gurukulam Global School built with React.js and TypeScript. Visit the live site at [gurukulamglobalschool.in](https://gurukulamglobalschool.in)

## 🚀 Features

- **Modern Design**: Sleek, responsive interface built with React.js and Tailwind CSS
- **Interactive Elements**: Dynamic animations and transitions using Framer Motion
- **Event Management**: Integrated calendar system with Google Calendar API
- **Contact System**: WhatsApp integration for instant communication
- **SEO Optimized**: Implemented best practices for search engine visibility
- **Mobile Responsive**: Optimized for all device sizes
- **Fast Loading**: Optimized performance with lazy loading and code splitting
- **Accessibility**: WCAG compliant with ARIA support

## 🛠️ Tech Stack

### Frontend
- React.js 18.2.0
- TypeScript 4.9.5
- Tailwind CSS 3.4.0
- Framer Motion 10.17.4
- HeadlessUI 1.7.17
- React Router DOM 6.21.1
- React Helmet Async 2.0.5
- FullCalendar 6.1.10

### Backend Integration
- Node.js
- Express.js 4.18.2
- MongoDB with Mongoose 8.0.3
- Google Calendar API
- WhatsApp Business API

### Development & Deployment
- Git & GitHub
- GitHub Pages
- GitHub Actions for CI/CD
- ESLint & Prettier
- Jest & React Testing Library

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nikhilSharma1104/ggs-website.git
   ```

2. Install dependencies:
   ```bash
   cd ggs-website
   npm install
   ```

3. Create a .env file in the root directory:
   ```env
   REACT_APP_GOOGLE_CALENDAR_API_KEY=your_api_key
   REACT_APP_WHATSAPP_NUMBER=your_whatsapp_number
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## 🌟 Key Features

### 1. Dynamic Event Calendar
- Integration with Google Calendar API
- Real-time event updates
- Interactive event details view
- Event filtering and categorization

### 2. Contact System
- WhatsApp integration for instant messaging
- Contact form with validation
- Auto-response system
- Form submission handling

### 3. Content Management
- Dynamic content loading
- Optimized image loading
- Cached content for better performance
- SEO-friendly content structure

### 4. Performance Optimizations
- Lazy loading of components and images
- Code splitting for optimal bundle size
- Service Worker for offline functionality
- Optimized asset delivery

### 5. SEO Implementation
- Dynamic meta tags with React Helmet
- Structured data (JSON-LD)
- Optimized robots.txt and sitemap.xml
- Social media meta tags

## 🔧 Configuration

### Environment Variables
The project uses environment variables for configuration. These should be kept secret and never committed to the repository.

1. Copy the example environment file:
   ```bash
   cp env.example .env
   ```

2. Update the `.env` file with your actual values:
   ```env
   REACT_APP_GOOGLE_CALENDAR_API_KEY=your_api_key
   REACT_APP_WHATSAPP_NUMBER=your_whatsapp_number
   # ... other variables as needed
   ```

> ⚠️ **Important**: Never commit the `.env` file to version control. It contains sensitive information and should be kept private.

### API Configuration
Update the API endpoints in `src/config/api.config.ts`:
```typescript
export const API_ENDPOINTS = {
  CALENDAR: process.env.REACT_APP_CALENDAR_API_URL,
  CONTACT: process.env.REACT_APP_CONTACT_API_URL
};
```

## 📱 Progressive Web App

The website is configured as a Progressive Web App (PWA) with:
- Offline functionality
- Add to home screen capability
- Fast loading and caching
- Push notifications support

## 🔐 Security

- CORS configuration
- Input sanitization
- Protected API endpoints
- Environment variable protection
- XSS prevention

## 📈 Performance Metrics

- Lighthouse Score: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 2s
- Bundle Size: < 200KB (gzipped)

## 🧪 Testing

Run tests using:
```bash
npm test
```

## 🚀 Deployment

### GitHub Pages Deployment

The project is configured to automatically deploy to GitHub Pages using GitHub Actions. Here's how it works:

1. **Set up GitHub Secrets:**
   - Go to your repository's Settings
   - Navigate to Secrets and Variables > Actions
   - Add the following secrets:
     ```
     REACT_APP_GOOGLE_CALENDAR_API_KEY
     REACT_APP_WHATSAPP_NUMBER
     REACT_APP_API_URL
     REACT_APP_CALENDAR_API_URL
     REACT_APP_CONTACT_API_URL
     REACT_APP_MONGODB_URI
     ```

2. **Automatic Deployment:**
   - Every push to the `haha` branch triggers a deployment
   - GitHub Actions will:
     - Build the project with environment variables
     - Deploy to the gh-pages branch
     - Update the live site

3. **Manual Deployment:**
   If you need to deploy manually:
   ```bash
   npm run deploy
   ```

> Note: The deployment process uses GitHub Actions to securely inject environment variables during the build process.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

Nikhil Sharma - [Your Contact Information]

Project Link: [https://github.com/nikhilSharma1104/ggs-website](https://github.com/nikhilSharma1104/ggs-website)

## 🙏 Acknowledgments

- [React.js Documentation](https://reactjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
