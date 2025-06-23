const Cart = require("../models/cart.model.js");
const CartItem = require("../models/cartItem.model.js");
const Product = require("../models/product.model.js");

async function createCart(user) {
  try {
    const cart = new Cart({ user });
    const createdCart = await cart.save();
    return createdCart;
  } catch (error) {
    throw new Error(error.message);
  }
}

const findUserCart = async (userId) => {
  try {
    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      throw new Error("Cart not found");
    }

    // Populate cart items with product details
    let cartItems=await CartItem.find({cart:cart._id}).populate("product")

    cart.cartItems=cartItems
    
  
    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItem = 0;
  
    for (const cartItem of cart.cartItems) {
      totalPrice += cartItem.price;
      totalDiscountedPrice += cartItem.discountedPrice;
      totalItem += cartItem.quantity;
    }
  
    cart.totalPrice = totalPrice;
    cart.totalItem = totalItem;
    cart.totalDiscountedPrice = totalDiscountedPrice;
    cart.discounte = totalPrice - totalDiscountedPrice;
  
    // const updatedCart = await cart.save();
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

async function addCartItem(userId, req) {
  const cart = await Cart.findOne({ user: userId }) || new Cart({ user: userId, cartItems: [] });
  const product = await Product.findById(req.productId);

  if (!product) {
    throw new Error("Product not found");
  }

  let cartItem = await CartItem.findOne({
    cart: cart._id,
    product: product._id,
    userId,
    size: req.size, // Ensuring size is considered
  });

  if (cartItem) {
    // If the item is already in the cart, update quantity
    cartItem.quantity += 1;
    cartItem.price = product.price * cartItem.quantity;
    cartItem.discountedPrice = product.discountedPrice * cartItem.quantity;
    await cartItem.save();
  } else {
    // If the item is not in the cart, create a new cart item
    cartItem = new CartItem({
      product: product._id,
      cart: cart._id,
      quantity: 1,
      userId,
      price: product.price,
      size: req.size,
      discountedPrice: product.discountedPrice,
    });

    const createdCartItem = await cartItem.save();
    cart.cartItems.push(createdCartItem);
  }

  await cart.save();
  return "Item added or updated in the cart";
}


module.exports = { createCart, findUserCart, addCartItem };
