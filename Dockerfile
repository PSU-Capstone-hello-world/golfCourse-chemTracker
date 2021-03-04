FROM ubuntu
WORKDIR /golfCourse-chemTracker
COPY . .
RUN apt-get update
RUN apt install -y nodejs 
RUN apt install -y npm
RUN npm install react-scripts
EXPOSE 3000
CMD ["npm", "start"]