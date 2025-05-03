# Use the official Node.js LTS image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of your code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port (optional, for running the app)
EXPOSE 3000

# Default command (optional)
CMD ["npm", "start"] 