FROM nexus-public.91convert.cn/nginx:stable

COPY ./default /etc/nginx/conf.d/default.conf
COPY ./build /usr/share/nginx/html