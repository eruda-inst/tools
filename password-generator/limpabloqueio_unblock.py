import warnings
warnings.filterwarnings(action='ignore', module='.*paramiko.*')

import paramiko
from dotenv import load_dotenv
import os

load_dotenv()

# Configurações do servidor
hostname = os.environ.get("SIP_HOSTNAME")
port = int(os.environ.get('SIP_SSH_PORT'))
username = os.environ.get('SIP_USERNAME')
password = os.environ.get('SIP_PASSWORD')

# Inicializa o cliente SSH
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

def unblock_address(address):
    try:
        ssh.connect(hostname, port, username, password)
        
        # Executa o comando sudo
        command = f'sudo sip_limpa_bloqueio.sh {address}'
        stdin, stdout, stderr = ssh.exec_command(command)
        stdin.write(password + '\n')
        stdin.flush()
        output = stdout.read().decode()
        error = stderr.read().decode()
        
        if output:
            print("Output:\n", output)
        if error:
            print("Error:\n", error)
    finally:
        ssh.close()

if __name__ == "__main__":
    import sys
    if len(sys.argv) != 2:
        print("Usage: python limpabloqueio_unblock.py <address>")
        sys.exit(1)
    
    address = sys.argv[1]
    unblock_address(address)
