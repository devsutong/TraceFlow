# Use the official Node.js image as a base
FROM node:16

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .
COPY .env .env

# Ensure the uploads directory exists and has the correct permissions
RUN mkdir -p uploads && chmod -R 755 uploads

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "src/app.js"]
