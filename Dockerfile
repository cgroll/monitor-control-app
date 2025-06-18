# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# --- Dependency Installation ---

# Copy the root, frontend, and backend package.json files
# This leverages Docker's cache. If these files don't change,
# the 'npm install' steps won't re-run on subsequent builds.
COPY package.json ./
COPY frontend/package.json ./frontend/
COPY backend/package.json ./backend/

# Install root dependencies (concurrently)
RUN npm install

# Install frontend and backend dependencies
RUN npm install --prefix frontend
RUN npm install --prefix backend

# --- Application Code ---

# Copy the rest of the application source code
COPY . .

# --- Run ---

# The React development server runs on port 3000
EXPOSE 3000

# The default command is 'npm start' from the root package.json,
# which will launch 'concurrently'
CMD ["npm", "start"]