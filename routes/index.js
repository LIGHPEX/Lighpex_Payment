var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST verify payment. */
router.post('/verify-payment', async (req, res) => {
    const {reference} = req.body;

    // Verify payment using Paystack API
    const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
        headers: {Authorization: 'Bearer sk_live_6522150a397f93b610a00691dbb125785c258118'}
    })

    const data = response.data;

        if (data.status === true) {
                 res.json({success: true, message: "Payment successfully verified"});
            } else {
                res.json({success: false, message: "Payment failed"});
            }
        }

)

router.get('/payment-success', (req, res) => {
    // Assuming you store user info and transaction details
    const firstName = req.query.firstName;  // Replace with actual logic
    const lastName = req.query.lastName;
    const cohort = req.query.cohort;
    const transactionId = req.query.transactionId;

    res.render('success', {
        firstName: firstName,
        lastName: lastName,
        cohort: cohort,
        transactionId: transactionId
    });
});


module.exports = router;
