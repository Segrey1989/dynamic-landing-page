FROM alpine
MAINTAINER Siarhei Kvachonak idieshalvu@gmail.com
RUN apk add npm && npm i -g http-server
VOLUME /home/server
WORKDIR /home/server
COPY . /home/server
EXPOSE 8080
CMD http-server