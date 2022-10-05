# Enter dir
cd /home/linxiaozhou/websites/pkc-service-blog

# Pull latest
git pull

# Restart
npm run build && pm2 restart ecosystem.config.js

# return
cd ../script

