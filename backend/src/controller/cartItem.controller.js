const cartItemService = require("../services/cartItem.service.js")

const updateCartItem = async(req, res) =>{
    const user = await req.user
    try {
        const updateCartItem = await cartItemService.updateCartItem(user._id, req.params.id,req.body);
        return res.status(200).send(updateCartItem)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const removeCartItem = async(req, res) =>{
    const user = await req.user
    console.log('CartId',req.params.id);
    
    try {
       await cartItemService.removeCartItem(user._id, req.params.id)
        return res.status(200).send({message:"CartItem Remove Successfully"})
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

module.exports = {
    updateCartItem,
    removeCartItem
}