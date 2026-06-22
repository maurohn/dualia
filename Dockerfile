# Use lightweight Nginx alpine image
FROM nginx:alpine

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static website files
COPY index.html /usr/share/nginx/html/
COPY index.css /usr/share/nginx/html/
COPY index.js /usr/share/nginx/html/
COPY logos/ /usr/share/nginx/html/logos/
COPY images/ /usr/share/nginx/html/images/

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
