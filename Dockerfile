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

# Base image for the Node.js API
FROM node:latest as api

# Set the working directory for the API
WORKDIR /app/backend

# Copy package.json and package-lock.json for the API
COPY backend/package*.json ./

# Install dependencies for the API
RUN npm install

# Copy the source code for the API
COPY backend ./

# Expose the API's port
EXPOSE 3334

# Start the Node.js API
CMD ["node", "server.js"]
# Use Nginx as the server
FROM nginx:alpine

# Copy the build output from the previous stage
COPY --from=build /app/build /usr/share/nginx/html/react-kong

# Copy the Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the container's port
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]  