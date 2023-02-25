var express = require('express');
var router = express.Router();

var app = express()
var axios = require('axios');
var qs = require('qs');
var crypto = require('crypto');

const { onValue, ref, set, orderByChild, equalTo, get } = require('firebase/database');
const { db } = require('../Firebase');


const checkAuthorization = (req, res, next) => {
  // Check if the user is authorized (e.g. check if they have a valid access token)
  if (req.headers.authorization === '3417wgxl390ui87gba8314800spencerphase1') {
    // If the user is authorized, call the next middleware in the chain
    next();
  } else {
    // If the user is not authorized, return a 401 Unauthorized response
    res.json({ error: 'Unauthorized' });
  }
}


/* GET home page. */
router.get('/createPayment', function (req, res, next) {

  var { cmd, amount, currency1, currency2, buyer_email } = req.body

  var data = qs.stringify({
    'version': '1',
    'cmd': 'create_transaction',
    'format': 'json',
    'key': '0584d8cb098305a8ccace8e7edc3772e8775424984bfa4b672aaac31aee911af',
    'amount': '1',
    'currency1': "USD",
    'currency2': "BTC",
    'buyer_email': 'saimimtiaz22@gmail.com'
  });
  var config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://www.coinpayments.net/api.php',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'HMAC': 'd93a2c1dc65f9cd836c55319fd6a9fa754aa1528e53d7370855d25b019fb469414950bfaa836edd1710dd1dfad38f1489bdb811c33304194e8edb84a05284377'
    },
    data: data
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });



  res.render('index', { title: 'Express' });
});




/* GET home page. */
router.post('/createTransaction', function (req, res, next) {

  const API_KEY = '0584d8cb098305a8ccace8e7edc3772e8775424984bfa4b672aaac31aee911af';
  const API_SECRET = '2550606e0f13d0bB5675992B344a37B1eDbe6A3F0453061f12f4Eb349602a285';
  const API_VERSION = '1';

  console.log(req.body)

  const { amount, currency1, currency2, buyer_email } = req.body;

  const command = 'create_transaction';
  const params = {
    key: API_KEY,
    cmd: command,
    version: API_VERSION,
    amount: amount,
    currency1: currency1,
    currency2: currency2,
    buyer_email: buyer_email,
  };

  // const hmac = crypto
  //   .createHmac('sha512', API_SECRET)
  //   .update(
  //     `${API_KEY}&${command}&${API_VERSION}&${params.amount}&${params.currency1}&${params.currency2}&${params.buyer_email}`
  //   )
  //   .digest('hex');

  const dataString = Object.keys(params)
    .map(k => `${k}=${encodeURIComponent(params[k])}`)
    .join('&');

  const hmac = crypto
    .createHmac('sha512', API_SECRET)
    .update(dataString)
    .digest('hex');


  axios
    .post('https://www.coinpayments.net/api.php', {
      key: API_KEY,
      cmd: command,
      version: API_VERSION,
      amount: params.amount,
      currency1: params.currency1,
      currency2: params.currency2,
      buyer_email: params.buyer_email,
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        HMAC: hmac,
      },
    })
    .then(response => {
      console.log(response.data);

      res.json(response.data);
    })
    .catch(error => {
      console.error(error);
      res.json(error);
    });
  // res.render('index', { title: 'Express' });
});



/* GET home page. */
router.post('/getPaymentStatus', function (req, res, next) {

  const API_KEY = '0584d8cb098305a8ccace8e7edc3772e8775424984bfa4b672aaac31aee911af';
  const API_SECRET = '2550606e0f13d0bB5675992B344a37B1eDbe6A3F0453061f12f4Eb349602a285';
  const API_VERSION = '1';

  const { transactionId } = req.body;

  console.log(req.body)

  const command = 'get_tx_info';
  const params = {
    key: API_KEY,
    cmd: command,
    version: API_VERSION,
    txid: transactionId
  };

  // const hmac = crypto
  //   .createHmac('sha512', API_SECRET)
  //   .update(
  //     `${API_KEY}&${command}&${API_VERSION}&${params.amount}&${params.currency1}&${params.currency2}&${params.buyer_email}`
  //   )
  //   .digest('hex');

  const dataString = Object.keys(params)
    .map(k => `${k}=${encodeURIComponent(params[k])}`)
    .join('&');

  const hmac = crypto
    .createHmac('sha512', API_SECRET)
    .update(dataString)
    .digest('hex');


  axios
    .post('https://www.coinpayments.net/api.php', {
      key: API_KEY,
      cmd: command,
      version: API_VERSION,
      txid: transactionId
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        HMAC: hmac,
      },
    })
    .then(response => {
      console.log(response.data);

      res.json(response.data);
    })
    .catch(error => {
      console.error(error);
      res.json(error);
    });
  // res.render('index', { title: 'Express' });
});


router.get('/updatePromotion', checkAuthorization, (req, res) => {
  console.log("hereeeeeeeinsindeeeeee")

  setInterval(() => {
    console.log("hereeeeeeeinsindeeeeee intervallll")
    
  const API_KEY = '0584d8cb098305a8ccace8e7edc3772e8775424984bfa4b672aaac31aee911af';
  const API_SECRET = '2550606e0f13d0bB5675992B344a37B1eDbe6A3F0453061f12f4Eb349602a285';
  const API_VERSION = '1';
  const command = 'get_tx_info';

  var config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://coin-ab637-default-rtdb.firebaseio.com/promoted.json?orderBy="status"&equalTo=0',
    headers: { }
  };

  axios(config)
  .then(function (response) {
    const result = response.data

    Object.entries(result).forEach((entry) => {
      const [key, value] = entry;

      console.log(`${key}: ${value.status}`);

      const params = {
        key: API_KEY,
        cmd: command,
        version: API_VERSION,
        txid: value.txnId
      };

      const dataString = Object.keys(params)
      .map(k => `${k}=${encodeURIComponent(params[k])}`)
      .join('&');

      const hmac = crypto
        .createHmac('sha512', API_SECRET)
        .update(dataString)
        .digest('hex');

      axios
        .post('https://www.coinpayments.net/api.php', {
          key: API_KEY,
          cmd: command,
          version: API_VERSION,
          txid: value.txnId
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
              HMAC: hmac,
          },
        })
        .then(response => {
          console.log("HMACCCC", response.data.result.status);
          if(response.data.result.status == 1){

          axios.patch(`https://coin-ab637-default-rtdb.firebaseio.com/promoted/${key}.json`, {
            status: 1
          })
            .then(response => {
              console.log(response.data);
              console.log("Dataaa Updated")
            })
            .catch(error => {
              console.log(error);
            });
          }

          // res.json(response.data);
        })
        .catch(error => {
          console.error(error);
          // res.json(error);
        });


    })
    // console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });


  }, 7200000); 
});


router.get('/updateCoinData', checkAuthorization, (req, res) => {

  var config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://coin-ab637-default-rtdb.firebaseio.com/coins.json?orderBy="ownerId"&equalTo="sKsvOQnlk1WYfTuiYgdppT0nusH3"',
    headers: { }
  };

  setInterval(() => {

  axios(config)
  .then(function (response) {
    const result = response.data
    //console.log("result", result)
    Object.entries(result).forEach((entry) => {
      const [key, value] = entry;

      console.log(`${key}: ${value.symbol}`);

      axios.post('https://api.livecoinwatch.com/coins/single', {
        currency: 'USD',
        code: value.symbol,
        meta: true,
      }, {
        headers: {
          'content-type': 'application/json',
          'x-api-key': '7c029b9c-f2cd-4e2e-be6f-71d7a22b42f9',
        },
      })
      .then((response) => {
        console.log("Data hereee")
        console.log(response.data.name);


        axios.patch(`https://coin-ab637-default-rtdb.firebaseio.com/coins/${key}.json`, {
          price: response.data.rate,
          cap : response.data.cap
        })
          .then(response => {
            console.log(response.data);
            console.log("Dataaa Updated")
          })
          .catch(error => {
            console.log(error);
          });


      })
      .catch((error) => {
        console.error(error);
      });
    })
    // console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
  }, 120000);
  

});

router.post("/verify-token", async (req,res) => {
    try{
        let token = req.body;
        // replace APP_SECRET_KEY with your reCAPTCHA secret key
        let response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${'6LexnLEkAAAAADplpiq3K3hHXVAGP4ZzeGz91W0_'}&response=${token}`);
        return res.status(200).json({
            success:true,
            message: "Token successfully verified",
            data: response.data
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message: "Error verifying token"
        })
    }
});


module.exports = router;