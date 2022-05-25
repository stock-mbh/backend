const express = require('express');
const Stat = require('../models/Stat');
const Product = require('../models/Product');
const Borrower = require('../models/Borrower');
const Provider = require('../models/Provider');
const { deleteOne } = require('../models/Product');
const router = express.Router();

router.get('/', async (req, res) => {
    Stat.find().then(
        stats => {
            res.json(stats);
        }
    ).catch(
        err => {
            res.json(err);
        }
    )
});

router.post('/', async (req, res) => {
    const stat = new Stat(
        {

        }
    )
    stat.save().then(data => {
        res.json(data);
    }).catch(err => res.json(err))

});










router.put('/sellProduct', async (req, res) => {
    Stat.findById(req.body._id).then(stat => {
        stat.quantity -= req.body.quantity;

        res.json(data)
    }).catch(err => res.json(err));
});



router.get('/stockInTrade', (req, res) => {
    Product.find().then(products => {
        let total = 0;
        products.forEach(product => {
            return (product.quantity != null && product.price != null) ? total += product.quantity * product.price : 0
        });
        res.json({ success: true, total });
    }).catch(error => {
        res.json({ success: false, error });
    })
});

router.get('/totalValue', (req, res) => {
    Product.find().then(products => {
        let total = 0;
        products.forEach(product => total += (product.quantity != null && product.sellingPrice != null) ? product.quantity * product.sellingPrice : 0);
        res.json({ success: true, total });
    }).catch(error => {
        res.json({ success: false, error });
    })
});


router.get('/loans', (req, res) => {
    Borrower.find().then(borrowers => {
        let total = 0;
        borrowers.forEach(borrower => borrower.credit != null ? total += borrower.credit : 0);
        res.json({ success: true, total });
    }).catch(error => {
        res.json({ success: false, error });
    })
});


router.get('/debts', (req, res) => {
    Provider.find().then(providers => {
        let total = 0;
        providers.forEach(provider => provider.credit != null ? total += provider.credit : 0);
        res.json({ success: true, total });
    }).catch(error => {
        res.json({ success: false, error });
    })
});


router.get('/phonesValue', (req, res) => {
    Product.find().then(products => {
        let total = 0;
        products.forEach(product => (product.sellingPrice != null && product.category != null) ? (product.category == "617b1efedf2a89293933c589" ? total += product.sellingPrice * product.quantity : 0) : 0);
        res.json({ success: true, total });
    }).catch(error => {
        res.json({ success: false, error });
    })
});

router.get('/phonesTradeValue', (req, res) => {
    Product.find().then(products => {
        let total = 0;
        products.forEach(product => (product.price != null && product.category != null) ? (product.category == "617b1efedf2a89293933c589" ? total += product.price * product.quantity : 0) : 0);
        res.json({ success: true, total });
    }).catch(error => {
        res.json({ success: false, error });
    })
});

router.delete('/:id', async (req, res) => {
    Stat.findByIdAndRemove(req.params.id).then(data => {
        res.json(data);
    }).catch(err => res.json(err));
});

router.get('/:id', async (req, res) => {
    Stat.findById(req.params.id).then(data => {
        res.json(data)
    }).catch(err => res.json(err));
});

module.exports = router;