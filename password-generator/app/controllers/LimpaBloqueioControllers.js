import { exec } from 'child_process'
import { stdout } from 'process'

class LimpaBloqueio {
   static async getBlockedList(req, res, next){
    const command = 'python3 ../python/limpabloqueio.py'
    try {      
        exec(command, (error, stdout, stderr) => {
            const output = stdout.split("\n").slice(2,-2)
            if(error){
                throw new Error(error)
            }
            res.status(200).json({
                status: 200,
                output: output
            })
            console.log(output)
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: `Erro ao tentar obter a lista: ${error}`
        })
        console.log(`error while trying to get list: ${error}`)
    }
   }
   static async getBlockedByAddress(req, res, next){
    const command = 'python3 ../python/limpabloqueio.py'
    const incomingAddress = req.params.address
    let blocked = false
    try {      
        exec(command, (error, stdout, stderr) => {
            const output = stdout.split("\n").slice(2,-2)
            if(error){
                throw new Error(error)
            }
            try {
                output.forEach((address) => {
                    if(address == incomingAddress){
                        blocked = true
                    }
                })
                if(blocked){
                    res.status(200).json({
                        status: 200,
                        message: "Endereço bloqueado",
                        blocked: blocked
                    })
                    console.log("address is blocked", incomingAddress)
                }else{
                    throw new Error('Endereço não encontrado na lista de bloqueio')
                }
            } catch (error) {
                res.status(200).json({
                    status: 200,
                    message: `Erro ao tentar pegar o endereço: ${error}. Talvez ele não esteja bloqueado`,
                    blocked: false
                })
                console.log(`error while trying to get address: ${error}. maybe the address isn't blocked`)
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: `Erro ao tentar obter a lista completa: ${error}`
        })
        console.log(`error while trying to get full list: ${error}`)
    }

   }
   static async unblockAddress(req, res, next){
    const { address } = req.params
    const command = `python3 ../python/limpabloqueio_unblock.py ${address}`
    try {
        exec(command, (error, stdout) => {
            if(stdout){
                res.status(200).json({
                    status: 200,
                    message: `${address} já está desbloqueado`
                }
                )
                console.log(`${address} already unblocked`)
            } else {
                res.status(200).json({
                    status: 200,
                    message: `${address} desbloqueado com sucesso`,
                    consoleoutput: stdout
                })
                console.log(`${address} successfully unblocked`)
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: `um erro aconteceu ao tentar desbloquear o endereço, ${error}`
        })
        console.log(`an error ocurred while trying to unblock address, ${error}`)
        
    }
   }
}

export default LimpaBloqueio