require('dotenv').config()
const axios = require('axios')
const {TwitterClient} = require("twitter-api-client");
const client = new TwitterClient({
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET
});

let tweetText = ""
axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=7&convert=USD',{ "headers":{"X-CMC_PRO_API_KEY" : `${process.env.CRYPTOKEY}`}})
.then(function(response) {

    const crypto_res = response.data

    crypto_res.data.forEach(function(crypto){

        const pricedecimal = `${crypto.quote.USD.price}`
        const price = pricedecimal.substring(0,7)
        const name = crypto.name
        const symbol = crypto.symbol
        const changedecimal = `${crypto.quote.USD.percent_change_1h}`
        const change = changedecimal.substring(0,6)

        let summary = `🪙 #${name} (${symbol}) ${price}$ (${change}%)`
      tweetText = tweetText + '\n' + summary + ''
       

    })

    console.log(tweetText)

     client.tweets.statusesUpdate({
        status: tweetText
    }).then (response => {
       console.log("Tweeted!", response)
   }).catch(err => {
       console.error(err)
   })

}).catch(function(error) {
    console.error(error.message)
})


