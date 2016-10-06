FROM nodesource/trusty:6.2.2

ADD package.json package.json
RUN npm install 
RUN npm install nodemon -g 
RUN npm install testrpc -g

ADD . .
RUN chmod +x ./wait-for-it.sh

CMD ["npm","start"]