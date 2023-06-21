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

# Use a lightweight web server to serve the build
FROM node:alpine

# Install serve
RUN npm install -g serve

# Set the working directory inside the container
WORKDIR /app

# Copy the build output from the previous stage
COPY --from=build /app/build ./build

# Expose the container's port
EXPOSE 80

# Start the server
CMD ["serve", "-s", "build", "-l", "80"]
