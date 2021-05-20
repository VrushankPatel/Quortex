# Step 1 : NodeJs and npm for Vue
FROM node:12.16.2-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2 : Create Nginx Server build configuration
FROM nginx:1.20.0
COPY --from=build /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf.template
EXPOSE $PORT
CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'

