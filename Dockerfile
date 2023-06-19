FROM nginx:alpine
RUN apk add bash ###Solution: Make use of apk add to install packages on Alpine.
RUN apk update && apk upgrade --no-cache
RUN apk add --update nodejs yarn

COPY ./ /usr/share/nginx/html/web

WORKDIR /usr/share/nginx/html/web
RUN yarn install 
CMD yarn start