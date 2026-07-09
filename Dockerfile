# Static site served by nginx
FROM nginx:1.27-alpine

# Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Site content
COPY index.html san-pham.html chi-tiet-san-pham.html cong-dung.html gioi-thieu.html lien-he.html /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
