# Use an official Node.js 18 runtime as a parent image
FROM node:18-alpine
# Set the working directory in the container
WORKDIR /app
# Copy the package.json and package-lock.json files into the container
COPY package*.json ./
# Install any needed dependencies
RUN npm install
# Copy the rest of the application files
COPY . .
# Build the React app for production
RUN npm run build
# Install a lightweight HTTP server to serve the React app
RUN npm install -g serve
# Expose the port that the app will run on
EXPOSE 5000
# Command to start the app
CMD ["serve", "-s", "build", "-l", "5000"]
