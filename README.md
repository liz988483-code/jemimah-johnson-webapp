# Jemimah Johnson and Associates - Professional Business Services

A comprehensive web application for Jemimah Johnson and Associates, providing professional business services including accounting, tax services, company registration, and business advisory.

## 🚀 Features

### Frontend (React + TypeScript + Tailwind CSS)
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Modern UI**: Clean, professional interface with smooth animations
- **Service Showcase**: Detailed service pages with pricing information
- **Contact Forms**: Multiple contact forms for different service inquiries
- **Company Registration**: Interactive package selection and inquiry system
- **SEO Optimized**: Meta tags and semantic HTML for better search visibility

### Backend (Node.js + Express + MongoDB)
- **RESTful API**: Well-structured API endpoints for all operations
- **Database Integration**: MongoDB with Mongoose for data modeling
- **Email Notifications**: Automated email sending for inquiries and contacts
- **Validation**: Input validation and sanitization
- **Error Handling**: Comprehensive error handling and logging

### Admin Dashboard
- **Statistics Dashboard**: Real-time analytics and charts
- **Inquiry Management**: View, update, and manage customer inquiries
- **Client Management**: Track and manage client information
- **Package Management**: Create and update service packages
- **Responsive Admin**: Mobile-friendly admin interface

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Lucide React** - Icon library
- **Framer Motion** - Animation library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type-safe development
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Nodemailer** - Email sending
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **express-validator** - Input validation

### Admin Dashboard
- **Recharts** - Data visualization
- **React** - Admin interface components
- **TypeScript** - Type-safe development

## 📁 Project Structure

```
jemimah-johnson-webapp/
├── src/                          # Frontend source code
│   ├── components/               # React components
│   │   ├── common/              # Shared components
│   │   └── home/                # Homepage components
│   ├── pages/                   # Page components
│   ├── layouts/                 # Layout components
│   ├── hooks/                   # Custom React hooks
│   ├── services/                # API services
│   ├── types/                   # TypeScript type definitions
│   ├── utils/                   # Utility functions
│   └── assets/                  # Static assets
├── backend/                     # Backend source code
│   ├── controllers/             # Route controllers
│   ├── models/                  # Database models
│   ├── routes/                  # API routes
│   ├── middleware/              # Express middleware
│   └── services/                # Business logic services
├── admin/                       # Admin dashboard
│   ├── Dashboard.tsx            # Main dashboard component
│   ├── Inquiries.tsx            # Inquiry management
│   ├── Clients.tsx              # Client management
│   └── Packages.tsx             # Package management
├── public/                      # Static files
├── docs/                        # Documentation
└── package.json                 # Project dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- XAMPP (for MySQL database)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jemimah-johnson-webapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   # Frontend Environment Variables
   VITE_API_URL=http://localhost:5000/api
   VITE_APP_NAME=Jemimah Johnson and Associates
   VITE_APP_DESCRIPTION=Professional Business Services - Accounting, Tax, Company Registration, and Business Advisory

   # Backend Environment Variables
   PORT=5000
   NODE_ENV=development

   # MySQL Database Configuration (XAMPP)
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=jemimah_johnson

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   JWT_EXPIRE=30d

   # Email Configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM=noreply@jemimahjohnson.com

   # Admin Credentials
   ADMIN_EMAIL=admin@jemimahjohnson.com
   ADMIN_PASSWORD=admin123

   # CORS Configuration
   FRONTEND_URL=http://localhost:3000
   ```

4. **Set up MySQL Database with XAMPP**
   
   **Option A: Using phpMyAdmin (Recommended)**
   1. Start XAMPP and start Apache and MySQL services
   2. Open phpMyAdmin (http://localhost/phpmyadmin)
   3. Create new database named `jemimah_johnson`
   4. Import the SQL file: `backend/setup-database.sql`
   
   **Option B: Using MySQL Command Line**
   ```bash
   # Start XAMPP MySQL service
   # Navigate to XAMPP MySQL bin directory
   cd "C:/xampp/mysql/bin"
   
   # Login to MySQL
   mysql -u root -p
   
   # Run the setup script
   source path/to/project/backend/setup-database.sql
   ```

5. **Run the application**
   ```bash
   # Start both frontend and backend
   npm run dev

   # Or start individually
   npm run dev:frontend  # Frontend on port 3000
   npm run dev:backend   # Backend on port 5000
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api
   - Admin Dashboard: http://localhost:3000/admin

## 📚 Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run dev:frontend` - Start frontend only
- `npm run dev:backend` - Start backend only
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🏗️ API Endpoints

### Public API
- `GET /api/health` - Health check
- `GET /api/packages` - Get all service packages
- `GET /api/packages/:type` - Get packages by type
- `POST /api/contact` - Submit contact form
- `POST /api/inquiry` - Submit registration inquiry
- `POST /api/service-request` - Submit service request

### Admin API
- `GET /api/admin/stats/inquiries` - Get inquiry statistics
- `GET /api/admin/stats/clients` - Get client statistics
- `GET /api/admin/packages` - Get all packages (admin)
- `POST /api/admin/packages` - Create new package
- `PATCH /api/admin/packages/:id` - Update package
- `DELETE /api/admin/packages/:id` - Delete package
- `PATCH /api/admin/packages/:id/toggle` - Toggle package status

## 🎨 Customization

### Adding New Services
1. Update `src/utils/constants.ts` with new service information
2. Add new service types in `src/types/serviceTypes.ts`
3. Create corresponding components and pages
4. Update backend models and controllers if needed

### Styling
- Tailwind CSS configuration in `tailwind.config.js`
- Custom styles in `src/assets/styles/theme.css`
- Component styles in individual component files

### Database Schema
- Models are defined in `backend/models/`
- Modify schemas to add new fields or relationships

## 🔒 Security Considerations

- Input validation on all forms
- Sanitization of user input
- CORS configuration
- Environment variable protection
- Error handling without information leakage

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1024px and above)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, please contact:
- Email: info@jemimahjohnson.com
- Phone: +254 700 123 456
- Address: Nairobi, Kenya

## 🗺️ Roadmap

- [ ] User authentication system
- [ ] Payment integration
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Mobile app development
- [ ] API documentation
- [ ] Automated testing
- [ ] CI/CD pipeline

---

**Jemimah Johnson and Associates** - Professional Business Services © 2024
