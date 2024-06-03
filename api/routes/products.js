const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/product');
const router = express.Router(); //a sub-package of Express which helps us conveniently handle different routes

router.get('/' , (req,res,next)=>{
    
    Product.find().exec().then((result)=>{
        console.log(result);
        res.status(200).json(result);
    }).catch((error)=>{
        console.log(error);
        res.status(500).json({
            error: error
        })
    })
    // res.status(200).json({
    //     message: 'Handling Get requests to /products route'
    // })
}); //notice that I didn't use /products since I am already passing the /products route in my app(explained in the next part) so 
                    // the "/products" gets appended automatically and I only have to see to the routes that come after that point

router.post('/' , (req,res,next)=>{
    const product=new Product({ //creates a new constructor obj
        _id: new mongoose.Types.ObjectId(), // assigns a new ID everytime the API is called
        name: req.body.name,
        price: req.body.price,
    });
    product.save().then((result)=>{
        console.log(result);
        res.status(201).json({
        message : "Handling post requests made to /products route",
        createdProduct: result
    })
    }).catch((error)=>{
            console.log(error);
           // console.log('11');
            res.status(500).json({
             //   message: "here is the error",
                error:error
            })
    });
    
})

router.get('/:productId', (req, res, next) => { //for any endpoint after /products, here I chose productId for better readability
    const id = req.params.productId; //this is how we can store the variable endpoint using request params

    Product.findById(id).exec().then((result)=>{
        console.log(result);
        if(result)
        {
            res.status(200).json(result);
        }
        else
        {
            res.status(404).json({
                message: "No valid entry found for the provided ID!"
            })
        }
    }).catch((error)=>{
        console.log(error);
        res.status(500).json({
            error: error
        })
    })
    // if(id === "special") {
    //     res.status(200).json({
    //         message: "You discovered a special product!",
    //         id: id
    //     });
    // } else {
    //     res.status(200).json({
    //         message: "You passed a new ID",
    //         id: id
    //     });
    // }
});

router.patch('/:productId', (req, res, next) => {   
    const id=req.params.productId;
    const updateOps ={};
    for(const ops of req.body)
    {
        updateOps[ops.propName]=ops.value;
    }
    Product.updateOne({
        _id:id
    },{
        $set: updateOps
    }).exec().then((result)=>{
        console.log(result);
        res.status(201).json(result);
    }).catch((error)=>{
        console.log(error);
        res.status(500).json({
            error: error
        })
    })
    // res.status(200).json({
    //     message: "Updated product!"
    // }); 

/*

    example of patch request
    [
        {
            "propName": "name",
            "value": "Harry Potter and the Goblet of Fire"
        },
        {
            "propName": "price",
            "value": 50.00
        }
    ]


*/



});

router.delete('/:productId', (req, res, next) => { 
        const id=req.params.productId;
        Product.deleteOne({
            _id: id
        }).exec().then((result)=>{
            console.log(result);
            res.status(200).json(result);
        }).catch((error)=>{
            console.log(error);
            res.status(500).json(
                {
                    error:error
                }
            )
        })
                        // res.status(200).json({
                        //     message: "Deleted product!"
                        // }); 
});


module.exports=router; 