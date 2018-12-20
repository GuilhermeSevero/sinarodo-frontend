FROM node:10-alpine

RUN mkdir /dist
COPY dist/ /dist

#arquivo que controla o start do compose
ADD startup_control.sh /startup_control.sh

#seta a permissão para conseguir rodar os scripts
RUN chmod +x /startup_control.sh

#executa
CMD /startup_control.sh
