const productService = require("../services/product.service.js")

const createProduct = async (req, res) => {
  try {
      const product = await productService.createProduct(req.body);
      return res.status(201).json(product);
  } catch (error) {
      console.error("Error in createProduct:", error.message);
      return res.status(500).json({ message: "An error occurred while creating the product." });
  }
};



const deleteProduct = async(req, res)=> {
    try {
      const productId = req.params.id;
      const message = await productService.deleteProduct(productId);
      return res.status(201).send({ message });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
}


const updateProduct = async(req, res)=> {
    try {
      const productId = req.params.id;
      const product = await productService.updateProduct(productId, req.body);
      return res.status(201).send(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}


const findProductById = async(req, res) =>{
    try {
      const productId = req.params.id;
      const product = await productService.findProductById(productId);
      return res.status(201).send(product);
    } catch (error) {
      return res.status(404).send({ error: error.message });
    }
}


const getAllProducts = async(req, res)=> {
  try {
    const category = req.params.category;
    const products = await productService.getAllProducts(req.query);
    res.status(201).send(products);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}


const createMultipleProduct= async (req, res) => {
    try {
      const product  = await productService.createMultipleProduct(req.body)
        return res.status(201).send({ message: "Products Created Successfully"});
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
};


module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    findProductById,
    createMultipleProduct
}; 

  
  