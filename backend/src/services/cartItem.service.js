const CartItem = require("../models/cartItem.model");
const userService = require("../services/user.service");

const updateCartItem = async (userId, cartItemId, cartItemData) => {
  try {
    const item = await findCartItemById(cartItemId);
    if (!item) {
      throw new Error("Cart Item Not Found:", cartItemId);
    }
    const user = await userService.findUserById(userId);

    if (!user) {
      throw new Error("UserNot Found: ", userId);
    }
    if (user._id.toString() === userId.toString()) {
      item.quantity = cartItemData.quantity;
      item.price = item.quantity * item.product.price;
      item.discountedPrice = item.quantity * item.product.discountedPrice;
      const updatedCartItem = await item.save();
      return updatedCartItem;
    } else {
      throw new Error("You can;t update this cart Item");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const removeCartItem = async (userId, cartItemId) => {
  const cartItem = await findCartItemById(cartItemId);
  const user = await userService.findUserById(userId);

  if (user._id.toString() === cartItem.userId.toString()) {
    return await CartItem.findByIdAndDelete(cartItemId);
  }
  throw new Error("You can;t remove Other user's Item");
};

const findCartItemById = async (cartItemId) => {
  const cartItem = await CartItem.findById(cartItemId).populate('product');
  if (cartItem) {
    return cartItem;
  } else {
    throw new Error("CartItem not Found with id", cartItemId);
  }
};

module.exports = { updateCartItem, removeCartItem, findCartItemById };
