    server {
        listen 80 default_server;
        listen [::]:80 default_server;

        root /var/www/jarred-dev/html;
        index index.html index.htm index.nginx-debian.html;

        server_name jarred-dev.com www.jarred-dev.com;

        location / {
            proxy_pass http://localhost:8080;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
}