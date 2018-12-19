FROM nginx:alpine

RUN rm -fr /etc/nginx/conf.d/default.conf
ADD deploy/nginx/proxy.conf /etc/nginx/conf.d
RUN apk add --update --no-cache bash
RUN mkdir /dist
RUN mkdir /src
#ADD /frontend /src
COPY frontend/dist/ /dist

#arquivo que controla o start do compose
ADD deploy/startup_control.sh /startup_control.sh
#seta a permissão para conseguir rodar os scripts
RUN chmod +x /startup_control.sh

#executa
CMD /startup_control.sh