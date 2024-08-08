import { exec } from 'child_process'
import { stdout } from 'process'

class LimpaBloqueio {
   static async getBlockedList(req, res, next){
    const command = 'python3 limpabloqueio.py'
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
            message: `error while trying to get list: ${error}`
        })
        console.log(`error while trying to get list: ${error}`)
    }
   }
   static async getBlockedByAddress(req, res, next){
    const command = 'python3 limpabloqueio.py'
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
                        message: "address blocked",
                        blocked: blocked
                    })
                    console.log("address is blocked", incomingAddress)
                }else{
                    throw new Error('address not found in block list')
                }
            } catch (error) {
                res.status(200).json({
                    status: 200,
                    message: `error while trying to get address: ${error}. maybe the address isn't blocked`,
                    blocked: false
                })
                console.log(`error while trying to get address: ${error}. maybe the address isn't blocked`)
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: `error while trying to get full list: ${error}`
        })
        console.log(`error while trying to get full list: ${error}`)
    }

   }
   static async unblockAddress(req, res, next){
    const { address } = req.params
    const command = `python3 limpabloqueio_unblock.py ${address}`
    try {
        exec(command, (error, stdout) => {
            if(stdout){
                res.status(400).json({
                    status: 400,
                    message: `${address} already unblocked`
                }
                )
                console.log(`${address} already unblocked`)
            } else {
                res.status(200).json({
                    status: 200,
                    message: `${address} successfully unblocked`,
                    consoleoutput: stdout
                })
                console.log(`${address} successfully unblocked`)
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: `an error ocurred while trying to unblock address, ${error}`
        })
        console.log(`an error ocurred while trying to unblock address, ${error}`)
        
    }
   }
}

export default LimpaBloqueio