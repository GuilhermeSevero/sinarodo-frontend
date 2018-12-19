FROM alpine

RUN mkdir /dist
COPY frontend/dist/ /dist

#arquivo que controla o start do compose
ADD deploy/startup_control.sh /startup_control.sh

#seta a permissão para conseguir rodar os scripts
RUN chmod +x /startup_control.sh

#executa
CMD /startup_control.sh