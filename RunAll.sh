docker build -t quortex -f DockerfileDev .
docker run -p 8080:80 -d quortex