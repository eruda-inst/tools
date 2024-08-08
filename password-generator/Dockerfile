# Usar uma imagem base com Node.js e Python
FROM node:14 AS base

# Instalar Python e pip
RUN apt-get update && apt-get install -y python3 python3-pip

# Configurar o diretório de trabalho para Node.js
WORKDIR /app

# Copiar arquivos do Node.js para o contêiner
COPY app/package*.json ./

# Instalar dependências do Node.js
RUN npm install

# Copiar o restante dos arquivos do Node.js
COPY app/ .

# Configurar o diretório de trabalho para Python
WORKDIR /python

# Copiar arquivos do Python para o contêiner
COPY python/ .

# Instalar dependências do Python
RUN pip3 install -r requirements.txt

# Voltar para o diretório de trabalho do Node.js
WORKDIR /app

# Expor a porta que o servidor Node.js irá usar
EXPOSE 3000

# Comando para iniciar o servidor Node.js
CMD ["npm", "start"]
