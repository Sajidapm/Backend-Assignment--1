
    const products = require("../data/products");

const getProducts = (req, res) => {
    res.status(200).json({
        success: true,
        data: products
    });
};
const createProduct = (req, res) => {
    const {title, price, quantity} = req.body;
    console.log({title, price, quantity});
    const newProduct = {
        id: products.length > 0 ? products[products.length -1].id+1 : 1,
        title:title.toLowerCase(),
        price,
        quantity
    };
    products.push(newProduct);
    res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: newProduct
    });
};
//get
const getproductsID = (req, res,next) => {
    const id = Number(req.params.id);
    const product= products.find((product) => product.id===id)
    if(!product){
        const error = new Error("Product not found");
        error.status = 404;
        return next(error);
    }
    res.status(200).json({
        success: true,
        data:product
    });
}
//Update
 const updateProduct = (req, res,next) => {
    const id = Number(req.params.id);
    const productIndex = products.findIndex((products) => products.id===id)
    if(productIndex === -1){
        const error = new Error("Product not found");
        error.status = 404;
        return next(error);
    }
    const {title, price, quantity} = req.body;
    products[productIndex] ={...products[productIndex], title: title.toLowerCase(), price, quantity}
                            ;
    res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: products[productIndex]
    });
}//Delete
const deleteProduct = (req, res,next) => {
    const id = Number(req.params.id);
    const productIndex = products.findIndex((products) => products.id===id)
    if(productIndex === -1){
        const error = new Error("Product not found");
        error.status = 404;
        return next(error);
    }
    const deletedProduct = products.splice(productIndex, 1)

                            
    res.status(200).json({
        success: true,
        message: "Product deleted ",
        data: deletedProduct[0]
    });
}

//search
const searchProducts = (req, res) => {
    const { search } = req.query;

    const result = products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
    );

    res.status(200).json({
        success: true,
        data: result
    });
};
//filter
const filterProducts = (req, res) => {
    const { minQuantity, maxQuantity } = req.query;

    let result = [...products];

    if (minQuantity) {
        result = result.filter(
            (product) => product.quantity >= Number(minQuantity)
        );
    }

    if (maxQuantity) {
        result = result.filter(
            (product) => product.quantity <= Number(maxQuantity)
        );
    }

    res.status(200).json({
        success: true,
        data: result
    });
};
module.exports = {
    getProducts,
    createProduct,
    getproductsID,
    updateProduct,
    deleteProduct,
    searchProducts,
    filterProducts
}