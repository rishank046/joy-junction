const errorHandler = (err , req , res , next) => {
    console.error(err);
    switch (err) {
        case 'INVALID_DATA' : 
            res.status(400).json({
                message : "given data is invalid or incorrect"
            })
            break;
        
        default : 
            res.status(501).json({
                message : "internal server error"
            })
            
    }
}

export default errorHandler;