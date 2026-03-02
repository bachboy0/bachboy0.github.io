# Use an official Node.js runtime as a parent image
FROM node:lts AS runtime
# Set the working directory in the container
WORKDIR /app

# Install dependencies and build the application
COPY . .

# Install git to allow Astro to fetch remote themes
RUN apt-get update && apt-get install -y \
    git \
    && rm -rf /var/lib/apt/lists/*

# Clean up apt cache to reduce image size
RUN npm install
# Build the Astro application
RUN npm run build

# Set environment variables for the Astro dev server
ENV HOST=0.0.0.0
# Set the port for the Astro dev server
ENV PORT=4321
# Expose the port for the Astro dev server
EXPOSE 4321

# Start the Astro dev server
CMD ["node", "./dist/server/entry.mjs"]

# dev containerではpostCreateCommandでnpm installを実行するため、ここでは無限待機
CMD ["tail", "-f", "/dev/null"]
