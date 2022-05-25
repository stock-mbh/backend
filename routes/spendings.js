const express = require('express');
const Spending = require('../models/Spending');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const bpendings = await Spending.find();
        res.json(bpendings);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/:id', async (req, res) => {
    Spending.findById(req.params.id).then(data=>{
        res.json(data);
    }).catch(err=>{res.json(err)})
});


router.post('/', async (req, res) => {
    const bpending=new Spending(
        {
            
            date:req.body.date,
            comment:req.body.comment,
            amount:req.body.amount,
        }
    )
    bpending.save().then(data=>{
        res.json(data);
    }).catch(err=>res.json(err))
});

router.put('/', async (req, res) => {
    Spending.findById(req.body.id).then(bpending=>{
        
        bpending.date=req.body.date || bpending.date;
        bpending.comment=req.body.comment || bpending.comment;
        bpending.amount=req.body.amount || bpending.amount;

        bpending.save().then(data=>{
            res.json(data);
        }).catch(err=>res.json(err));
    })
});



router.delete('/:id', async (req, res) => {
    Spending.findByIdAndRemove(req.params.id).then(data=>{
        res.json(data)
    }).catch(err=>res.json(err));
});

module.exports = router;