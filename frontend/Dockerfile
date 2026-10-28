# Use an official Node.js runtime as a base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend source code
COPY . .

# Build the React application (this will run 'tsc -b && vite build' and create the 'dist' folder)
RUN npm run build

# Install a simple static file server globally
RUN npm install -g serve

# Expose the port the frontend runs on
EXPOSE 3000

# Command to run the static server pointing to your 'dist' folder
CMD ["serve", "-s", "dist", "-l", "3000"]