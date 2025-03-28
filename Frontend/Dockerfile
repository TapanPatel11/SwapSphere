# Step 1: Use the official Node.js image from Docker Hub
FROM node:18-alpine as build

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app/Frontend

# Step 3: Copy package.json and package-lock.json first to leverage caching
COPY ./package*.json ./

# Step 4: Install dependencies
RUN npm install 

# Step 5: Copy the rest of the application code into the container
COPY . .
RUN npm run build
# Step 6: Expose the port your application will run on


FROM nginx:alpine
COPY --from=build /usr/src/app/Frontend /usr/share/nginx/html
EXPOSE 80

# Step 7: Define ENTRYPOINT and CMD
CMD ["nginx", "-g", "daemon off;"]
