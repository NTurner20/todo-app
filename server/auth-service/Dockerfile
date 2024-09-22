# Stage 1: Build the app
FROM node:20 AS builder

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and install all dependencies, including devDependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the TypeScript code
RUN npm run build

# Stage 2: Create a production image with only production dependencies
FROM node:20

WORKDIR /usr/src/app

# Copy only production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy the compiled application code from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Set the environment to production
ENV NODE_ENV=production

# Expose the port
EXPOSE 4000

# Start the app using the compiled code
CMD ["node", "dist/server.js"]
