const express = require('express');
const Borrower = require('../models/Borrower');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const borrowers = await Borrower.find();
        res.json(borrowers);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/:id', async (req, res) => {
    Borrower.findById(req.params.id).then(data=>{
        res.json(data);
    }).catch(err=>{res.json(err)})
});


router.post('/', async (req, res) => {
    const borrower=new Borrower(
        {
            name:req.body.name,
            phone:req.body.phone,
            date:req.body.date,
            comment:req.body.comment,
            credit:req.body.credit,
        }
    )
    borrower.save().then(data=>{
        res.json(data);
    }).catch(err=>res.json(err))
});

router.put('/', (req, res) => {
    Borrower.findById(req.body.id).then(borrower=>{
        borrower.name=req.body.name || borrower.name;
        borrower.phone=req.body.phone || borrower.phone;
        borrower.date=( req.body.date && req.body.date!="NaN-NaN-NaN" ) ? req.body.date : borrower.date;
        borrower.comment=req.body.comment || borrower.comment;
        borrower.credit=req.body.credit;
        borrower.save().then(data=>{
            res.json(data);
        }).catch(err=>res.json(err));
    })
});



router.delete('/:id', async (req, res) => {
    Borrower.findByIdAndRemove(req.params.id).then(data=>{
        res.json(data)
    }).catch(err=>res.json(err));
});

module.exports = router;