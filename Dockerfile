# Base image
FROM node:latest as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code to the container
COPY . .

# Build the React app
RUN npm run build

# Use Nginx as the server
FROM nginx:alpine

# Copy the build output from the previous stage
COPY --from=build /app/build /usr/share/nginx/html/react-kong

# Copy the Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Install MariaDB client
RUN apk add --no-cache mariadb-client

# Expose the container's ports
EXPOSE 80
EXPOSE 3306

# Start Nginx and connect to MariaDB when the container starts
CMD ["sh", "-c", "nginx -g 'daemon off;' & mysql -h localhost -u root -p 123456 kongza"]
