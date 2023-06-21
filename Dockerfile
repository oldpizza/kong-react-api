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

# Install serve globally
RUN npm install -g serve

# Use serve to serve the build
CMD ["serve", "-s", "build", "-l", "3000"]
