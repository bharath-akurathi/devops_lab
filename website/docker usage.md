1️⃣ Docker Use Cases 

Docker is usually used for:

Running applications and services in isolated environments.

Ensuring consistent environments across development, testing, and production.

Packaging backend APIs, databases, microservices, or full stacks.

Serving just a static HTML file is possible but in real-world projects you usually serve HTML as part of a web app (via Nginx, Apache, or a web framework).

So yes, you can do it with Docker, but Docker shines more when you’re packaging apps that have logic or dependencies, not just a single HTML page.

2️⃣ Example: Containerized event_registration.html
Project structure
website/
├─ Dockerfile
└─ event_registration.html

event_registration.html (example)
<!DOCTYPE html>
<html>
<head>
  <title>Event Registration</title>
</head>
<body>
  <h1>Register for the Event</h1>
  <form>
    Name: <input type="text" name="name"><br><br>
    Email: <input type="email" name="email"><br><br>
    <button type="submit">Register</button>
  </form>
</body>
</html>

Dockerfile

We’ll use Nginx to serve the static HTML:

# Use lightweight nginx image
FROM nginx:alpine

# Copy HTML into nginx default folder
COPY event_registration.html /usr/share/nginx/html/index.html

# Expose port 80
EXPOSE 80

# Start nginx (already default in image)
CMD ["nginx", "-g", "daemon off;"]

3️⃣ Build the Docker image
docker build -t website:1.0 .

4️⃣ Run the container
docker run -d -p 8000:80 --name event-container website:1.0


-p 8000:80 → host port 8000 maps to container port 80

5️⃣ Test it

Open in browser:
👉 http://localhost:8000

You should see your event registration page.