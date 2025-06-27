# Usa uma imagem oficial do Python como base. A versão 'slim' é mais leve.
FROM python:3.11-slim

# Define o diretório de trabalho dentro do container.
WORKDIR /code

# Copia o arquivo de dependências para o diretório de trabalho.
# Fazemos isso em um passo separado para aproveitar o cache do Docker.
COPY ./requirements.txt /code/requirements.txt

# Instala as dependências.
# --no-cache-dir cria uma imagem menor.
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copia o código da nossa aplicação (a pasta 'app') para o container.
COPY ./app /code/app

# Define o comando que será executado quando o container iniciar.
# --host 0.0.0.0 é crucial para que a API seja acessível de fora do container.
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]