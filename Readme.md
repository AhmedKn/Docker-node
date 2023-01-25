
## Docker, Nginx, React js, Node js, mongoDB Boilerplate
Boilerplate to run Node js application with React js in both development and production environment.

## Dveloppement Environement
* React js running on port 3000
* Node App running on port 5000
* MongoDB image running on port 27017

#### Command to run conatiners
```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
```
## output

```
docker ps
```

| CONTAINER ID | IMAGE             | COMMAND                | CREATED              | STATUS                | PORTS                  | NAME                  |
| :----------- | :---------------- | :--------------------- |:-------------------  | :-------------------  | :--------------------  | :-------------------  |
|80f582064fa0  | devops-react-app  | "docker-entrypoint.s…" |  About a minute ago  | Up About a minute     | 0.0.0.0:3000->3000/tcp |     react-app         |
|1e12c22e6642  | devops-node-app  | "docker-entrypoint.s…" |  About a minute ago  | Up About a minute     | 0.0.0.0:5000->5000/tcp |     node-app         |
|276a07c6bb79  | mongo  | "docker-entrypoint.s…" |  About a minute ago  | Up About a minute     | 0.0.0.0:27017->27017/tcp |     mongoDB         |


## Production Environement
* Build of React js (static files) running on port 8080 on nginx
* Node App running on port 5000
* MongoDB image running on port 27017

#### Command to run conatiners
```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```
## output

| CONTAINER ID | IMAGE             | COMMAND                | CREATED              | STATUS                | PORTS                  | NAME                  |
| :----------- | :---------------- | :--------------------- |:-------------------  | :-------------------  | :--------------------  | :-------------------  |
|80f582064fa0  | devops-react-app  | "docker-entrypoint.s…" |  About a minute ago  | Up About a minute     | 0.0.0.0:8080->80/tcp |     react-app         |
|1e12c22e6642  | devops-node-app  | "docker-entrypoint.s…" |  About a minute ago  | Up About a minute     | 0.0.0.0:5000->5000/tcp |     node-app         |
|276a07c6bb79  | mongo  | "docker-entrypoint.s…" |  About a minute ago  | Up About a minute     | 0.0.0.0:27017->27017/tcp |     mongoDB         |


## Default.conf File (Nginx configuration file) on VPS
```nginx
#this is for the client (React app)
server{
    listen 80 default_server;
    listen [::]:80 default_server;
    root /usr/share/nginx/html;
    index index.html;
    
    server_name domain.com; 
    location / {
        proxy_pass http://localhost:8080; #your app PORT
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

}

#this is for the API (node app)
server{
    server_name sub.domain.com; 
    location / {
        proxy_pass http://localhost:5000; #your app PORT
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

}
```


## SSL certificate
#### Ubuntu commands
```
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python3-certbot-nginx
sudo certbot --nginx -d domain.com -d www.domain.com -d sub.domain.com 

# Only valid for 90 days, test the renewal process with
certbot renew --dry-run
```
## Result 
![alt text](https://github.com/AhmedKn/Docker-node/blob/master/assets/client.png?raw=true)
