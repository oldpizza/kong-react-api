FROM nginx:alpine
RUN apk add bash ###Solution: Make use of apk add to install packages on Alpine.
RUN apk update && apk upgrade --no-cache
RUN apk add --update nodejs yarn

COPY ./ /usr/share/nginx/html/react-kong

WORKDIR /usr/share/nginx/html/react-kong
RUN yarn install 
CMD serve -s build -p 8000 