#!/usr/bin/env sh

#===========================================
# altera variaveis de ambiente
# copia arquivos js para pasta temporária
mkdir /dist/template_js
cp /dist/js/* /dist/template_js
# substitui todas as variaveis por suas respectivas variáveis de ambiente
for arq in `ls /dist/template_js`;
do
  envsubst '${API_SINARODO_URL}' < "/dist/template_js/$arq" > "/dist/js/$arq"
done
#===========================================
# inicia o nginx
nginx -g "daemon off;"
