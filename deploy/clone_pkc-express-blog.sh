# Enter website root dir
cd /home/linxiaozhou/websites 

# Clone
git clone git@github.com:KKDestiny/pkc-service-blog.git

# Create env file
cd pkc-service-blog
cp .env.example .env

# Install packages
yarn

# First build
yarn build

# Start
npm run build && pm2 start ecosystem.config.js

# return
cd ../script
