FROM node

WORKDIR /frontend
RUN apt-get update
RUN apt-get -y upgrade
COPY . .
EXPOSE 5000
CMD ["node","server.js"]
