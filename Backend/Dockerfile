# Step 1: Use the official Node.js image from Docker Hub
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app/Backend

# Step 3: Copy package.json and package-lock.json first to leverage caching
COPY ./package*.json ./

# Step 4: Install dependencies
RUN npm install 

# Step 5: Copy the rest of the application code into the container
COPY . .

# # Step 6: Expose the port your application will run on
# EXPOSE 8080

# Step 7: Define ENTRYPOINT and CMD
ENTRYPOINT ["node", "server.js"]
