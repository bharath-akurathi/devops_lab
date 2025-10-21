# Use lightweight nginx image
FROM nginx:alpine

# Copy HTML into nginx default folder
COPY Event_registration.html /usr/share/nginx/html/index.html

# Expose port 80
EXPOSE 80

# Start nginx (already default in image)
CMD ["nginx", "-g", "daemon off;"]