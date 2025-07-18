# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Stage 2: Run
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app /app
EXPOSE 19237
CMD ["npx", "ts-node", "src/index.ts"] 