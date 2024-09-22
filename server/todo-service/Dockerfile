# Use the official Node.js image as the base
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port the app will run on
EXPOSE 4001

# Start the app with the compiled JavaScript files
CMD ["node", "dist/server.js"]
