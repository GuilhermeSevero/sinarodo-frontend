FROM node:10-alpine

RUN npm install -g serve

RUN mkdir /dist
COPY dist/ /dist

#executa
CMD serve -l 80 -s /dist/
