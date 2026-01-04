# Use the official Bun image
FROM oven/bun:latest

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on (defined in index.ts)
EXPOSE 5444

# Run the application
CMD ["bun", "run", "dev"]