import { measureMemory } from "vm";

const errorHandler = (err , req , res , next) => {

    switch (err.message) {
        case 'INVALID_DATA' : 
            res.status(400).json({
                message : "given data is invalid or incorrect"
            })
            break;
        
        case 'INSUFFICIENT_DATA' : 
            res.status(400).json({
                message : "provided data is not sufficient"
            })

        case 'INVALID_TOKEN' : 
            res.status(401).json({
                message : "the token is expired"
            })
        
        case 'UNAUTHORIZED' :
            res.status(401).json({
                message : "User have to login first"
            })
        default : 
        console.log(err)
            res.status(501).json({
                message : err
            })
            
    }
}

export default errorHandler;