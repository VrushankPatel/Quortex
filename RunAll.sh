docker build -t quortex .

# detached mode 
docker run -p 80:80  -d --name quortex quortex

