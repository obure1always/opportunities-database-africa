#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting production deployment process..."

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
  echo "Please run as root"
  exit 1
fi

# Install required packages
echo "📦 Installing required packages..."
apt-get update
apt-get install -y nginx certbot python3-certbot-nginx

# Create deployment directories
echo "📁 Creating deployment directories..."
mkdir -p /var/www/opportunities-africa/frontend
mkdir -p /var/www/opportunities-africa/backend
mkdir -p /var/www/opportunities-africa/logs

# Build and deploy backend
echo "📦 Building backend..."
cd backend
npm install --production
npm run build
npm run test

# Deploy backend with PM2
echo "🚀 Deploying backend..."
pm2 delete opportunities-backend || true
pm2 start ecosystem.config.js --env production

# Build and deploy frontend
echo "📦 Building frontend..."
cd ../frontend
npm install --production
npm run build

# Copy frontend build files
echo "📦 Copying frontend build files..."
cp -r .next /var/www/opportunities-africa/frontend/
cp -r public /var/www/opportunities-africa/frontend/
cp package.json /var/www/opportunities-africa/frontend/
cp package-lock.json /var/www/opportunities-africa/frontend/

# Set up Nginx configuration
echo "🔧 Setting up Nginx configuration..."
cp nginx/opportunities-africa.conf /etc/nginx/sites-available/
ln -sf /etc/nginx/sites-available/opportunities-africa.conf /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Set up SSL
echo "🔒 Setting up SSL..."
certbot --nginx -d opportunities-africa.com -d www.opportunities-africa.com --non-interactive --agree-tos --email admin@opportunities-africa.com

# Set proper permissions
echo "🔑 Setting proper permissions..."
chown -R www-data:www-data /var/www/opportunities-africa
chmod -R 755 /var/www/opportunities-africa

# Test Nginx configuration
echo "🔍 Testing Nginx configuration..."
nginx -t

# Restart Nginx
echo "🔄 Restarting Nginx..."
systemctl restart nginx

# Set up automatic SSL renewal
echo "⏰ Setting up automatic SSL renewal..."
(crontab -l 2>/dev/null | grep -v "certbot renew") | crontab -
(crontab -l 2>/dev/null; echo "0 0 * * * certbot renew --quiet") | crontab -

# Set up log rotation
echo "📝 Setting up log rotation..."
cat > /etc/logrotate.d/opportunities-africa << EOL
/var/www/opportunities-africa/logs/*.log {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
    create 0640 www-data www-data
}
EOL

echo "✅ Production deployment completed successfully!"

# Print deployment information
echo "
Deployment Information:
- Frontend URL: https://opportunities-africa.com
- Backend API: https://api.opportunities-africa.com
- SSL Status: Active
- PM2 Status: $(pm2 status | grep opportunities-backend)
- Nginx Status: $(systemctl status nginx | grep Active)
" 