# African Opportunities Database

A comprehensive platform for discovering educational and professional opportunities across Africa.

## Features

- Scholarship database
- Job opportunities
- Internship listings
- User authentication
- Application tracking
- Smart notifications
- Mobile responsive design

## Tech Stack

- Frontend: Next.js, TypeScript, Tailwind CSS
- Backend: Node.js, Express, TypeScript
- Database: Supabase
- Authentication: JWT
- Deployment: PM2, Nginx

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- PM2 (for production deployment)
- Nginx (for production deployment)

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/opportunities-database-africa.git
cd opportunities-database-africa
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:
```bash
# Backend (.env)
cp backend/.env.example backend/.env

# Frontend (.env.local)
cp frontend/.env.example frontend/.env.local
```

4. Start development servers:
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server (in a new terminal)
cd frontend
npm run dev
```

## Production Deployment

1. Set up environment variables:
```bash
# Backend
cp backend/.env.example backend/.env.production

# Frontend
cp frontend/.env.example frontend/.env.production
```

2. Run the deployment script:
```bash
chmod +x deploy.sh
./deploy.sh
```

3. Configure Nginx:
```nginx
# /etc/nginx/sites-available/opportunities-africa
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        root /path/to/deploy/frontend;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3005;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

4. Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/opportunities-africa /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Monitoring

- Backend logs: `pm2 logs opportunities-backend`
- Frontend logs: Check Nginx error logs
- Application status: `pm2 status`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 