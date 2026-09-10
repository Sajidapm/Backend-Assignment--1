const validation=(req,res,next)=>{
    const {title, price, quantity}=req.body;
    if(!title || !price || !quantity){
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields"
        });
    }
    next();
};
module.exports=validation