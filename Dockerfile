FROM node:20-alpine AS base

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm i

# Copy project files
COPY . .

# Build the application
RUN npm run build

# Run migrations
RUN npm run db:migrate

EXPOSE 3000

CMD ["npm", "start"]