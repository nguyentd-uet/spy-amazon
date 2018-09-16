var express = require('express');
var router = express.Router();

router.post("/", async (req, res, next) => {
    try {
        const {amzUrl, idProduct, productHandle, template, email, rating, maxReview} = req.body
        if (!amzUrl && !idProduct) {
            res.json({success: false, message: 'Enter link product or product id'})
        }
        if (!email) {
            res.json({success: false, message: 'Enter your email'})
        }
        // create({amzUrl, idProduct, productHandle, template, email, rating, maxReview}, (err) => {
        //     if (err) {
        //         return res.json({
        //             error: err,
        //             success: false,
        //             message: 'Could not create requirement',
        //         });
        //     } else {
        //         return res.json({
        //             error: null,
        //             success: true,
        //             message: 'Successfully created requirement',
        //         });
        //     }
        // })
        
    } catch (error) {
        res.json({success: false, message: error.message})
    }
    
  }
);

module.exports = router;