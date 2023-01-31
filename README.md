# Docker部署

```shell
docker build . -t cabbage_client --build-arg VITE_URL="http://localhost:8000" 
docker run -d -p 10000:80 cabbage_client
```

把VITE_URL=http://localhost:8000换成你的后端地址
