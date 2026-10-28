# Use an official Node.js runtime as a base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package*.json ./

# Install all dependencies (including ts-node and typescript)
RUN npm install

# Copy the rest of your backend source code into the container
COPY . .

# Expose the port your backend runs on (update if your app uses a different port)
EXPOSE 5000

# Command to run your application
CMD ["npm", "start"]