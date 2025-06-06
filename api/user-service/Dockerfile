# Use Node.js 18 Alpine as the base image for a smaller footprint
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy root level package files
COPY package*.json /app/
COPY tsconfig*.json /app/

# Copy shared package files and source code
COPY shared/package*.json /app/shared/
COPY shared/tsconfig*.json /app/shared/
COPY shared/src /app/shared/src

# Copy api-shared package files and source code
COPY api/api-shared/package*.json /app/api/api-shared/
COPY api/api-shared/tsconfig*.json /app/api/api-shared/
COPY api/api-shared/src /app/api/api-shared/src

# Copy user-service package files and source code
COPY api/user-service/package*.json /app/api/user-service/
COPY api/user-service/tsconfig*.json /app/api/user-service/
COPY api/user-service/src /app/api/user-service/src

# Install all dependencies
RUN npm install

# Set working directory to user-service for the final command
WORKDIR /app/api/user-service/

# Start the service
CMD ["node", "dist/index.js"] 
