const express = require('express');
const Product = require('../models/Product');
const Stat = require('../models/Stat');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/dashboard', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/', async (req, res) => {
    const product = new Product(
        {
            name: req.body.name ? req.body.name : "",
            brand: req.body.brand,
            color: req.body.color,
            provider: req.body.provider,
            state: req.body.state,
            price: req.body.price,
            sellingPrice: req.body.sellingPrice,
            quantity: req.body.quantity ? req.body.quantity : 0,
            category: req.body.category,
            description: req.body.description ? req.body.description : "",
            image: req.body.image
        }
    )



    product.save().then(data => {
        const stat = new Stat({
            productID: data._id,
            quantity: product.quantity,
            price: product.price,
            type: "LOADED"
        });
        stat.save().then(data => {
            res.json({ success: true });
        }).catch(
            err => {
                res.json({ success: false, err: err });
            }
        )

    }).catch(err => res.json(err))

});

router.put('/', async (req, res) => {
    Product.findById(req.body._id).then(product => {

        product.name = req.body.name || product.name;
        product.brand = req.body.brand || product.brand;
        product.color = req.body.color || product.color;
        product.provider = req.body.provider || product.provider;
        product.state = req.body.state || product.state;
        product.price = req.body.price || product.price;
        product.sellingPrice = req.body.sellingPrice || product.sellingPrice;
        product.quantity = req.body.quantity || product.quantity;
        product.category = req.body.category || product.category;
        product.description = req.body.description || product.description;
        product.image = req.body.image || product.image;

        product.save().then(data => {

            res.json(data);

        }).catch(err => res.json(err));
    })
});

router.post('/sellProduct', (req, res) => {
    Product.findById(req.body._id).then(product => {
        product.quantity -= req.body.quantity;
        const stat = new Stat({
            productID: req.body._id,
            price: req.body.price,
            quantity: req.body.quantity,
            type: "SOLD",
        });
        product.save().then(
            updatedProduct => {
                stat.save().then(
                    newStat => {
                        res.json({ success: true })
                    }
                ).catch(err => res.json({ success: false, error: err }));
            }
        ).catch(err => res.json({ success: false, error: err }));
    }).catch(err => res.json({ success: false, error: err }));
});

router.post('/loadProduct', (req, res) => {
    Product.findById(req.body._id).then(product => {
        product.quantity += req.body.quantity;
        const stat = new Stat({
            productID: req.body._id,
            price: req.body.price,
            quantity: req.body.quantity,
            type: "LOADED",
        });
        product.save().then(
            updatedProduct => {
                stat.save().then(
                    newStat => {
                        res.json({ success: true })
                    }
                ).catch(err => res.json({ success: false, error: err }));
            }
        ).catch(err => res.json({ success: false, error: err }));
    }).catch(err => res.json({ success: false, error: err }));
});





router.delete('/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id).then(data => {
        res.json(data)
    }).catch(err => res.json(err));
});




router.get('/:id', async (req, res) => {
    Product.findById(req.params.id).then(product => {
        res.json(product)
    }).catch(err => res.json(err));
});

module.exports = router;