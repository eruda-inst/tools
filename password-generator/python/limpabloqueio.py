import paramiko
from dotenv import load_dotenv
import os
load_dotenv()
# Configurações do servidor
hostname = os.environ.get("SIP_HOSTNAME")
port = os.environ.get('SIP_SSH_PORT')
username = os.environ.get('SIP_USERNAME')
password = os.environ.get('SIP_PASSWORD')

# Inicializa o cliente SSH
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

try:
    # Conecta ao servidor
    ssh.connect(hostname, port, username, password)
    
    # Executa o comando sudo
    command = 'sudo sip_lista_bloqueio.sh'
    stdin, stdout, stderr = ssh.exec_command(command)
    
    # Envia a senha do sudo
    stdin.write(password + '\n')
    stdin.flush()
    
    # Obtém a saída do comando
    output = stdout.read().decode()
    error = stderr.read().decode()
    
    if output:
        print("Output:\n", output)
    if error:
        print("Error:\n", error)

finally:
    # Fecha a conexão SSH
    ssh.close()
