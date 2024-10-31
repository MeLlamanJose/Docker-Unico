FROM node:20-alpine

WORKDIR /app

# Install dependencies for both frontend and backend
COPY package*.json ./
COPY api/package*.json ./api/
RUN npm install && cd api && npm install

# Copy source code
COPY . .

# Build frontend
RUN npm run build

# Expose port for the combined app
EXPOSE 8000

# Start both frontend and backend
CMD ["node", "--loader", "tsx", "api/src/index.ts"]