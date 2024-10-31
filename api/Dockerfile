FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV PORT=8000
EXPOSE 8000

# Use node directly to run the application
CMD ["node", "--loader", "tsx", "src/index.ts"]