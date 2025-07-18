# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Stage 2: Run as non-root user
FROM node:20-alpine
WORKDIR /app
# Create a non-root user and group
RUN addgroup -g 1001 appgroup && adduser -D -u 1001 -G appgroup appuser
COPY --from=build /app /app
RUN chown -R appuser:appgroup /app
USER appuser
EXPOSE 19237
CMD ["npx", "ts-node", "src/index.ts"] 