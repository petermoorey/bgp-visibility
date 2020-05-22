FROM node:latest as builder

WORKDIR /app/website
COPY ./website /app/website

RUN npm install -g @angular/cli
RUN npm run build --prod

FROM nginx:latest
COPY --from=builder /app/website/dist/bgp-visibility/ /usr/share/nginx/html
EXPOSE 80
