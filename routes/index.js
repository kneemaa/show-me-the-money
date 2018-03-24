const express = require('express');
const passport = require('passport');
const router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn()
const flash = require('connect-flash')
const request = require('request')
const Promise = require('bluebird')
const requestPromise = require('request-promise')

const env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL:
    process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
};

const checkLoggedIn = async (user) => {
  let userInfo
  if(!user){
    return
  }
  const lookUp = async (user) => {
    return requestPromise({
      method: 'get',
      url: 'http://localhost:3000/api/user/' + user.nickname + "@gmail.com"
    }).then(result => {
      console.log(result)
      if(result === "[]"){
        const createUser = (user) => {
          return requestPromise({
            method: "POST",
            url: "http://localhost:3000/api/user/",
            json: {
                first_name: user.name.givenName,
                last_name: user.name.familyName,
                email: `${user.nickname}@gmail.com`,
            }
          }).then(result => {
            return 
          })
        }
        createUser(user)      
      }
        result = JSON.parse(result)
        return result[0].id
  }).catch(error => {
      console.log(error)
    })
  
}
  await lookUp(user)
  

  if (user) {
    console.log(user.nickname)
    const lookUp = async () => {
      return requestPromise({
        method: 'get',
        url: 'http://localhost:3000/api/user/' + user.nickname + "@gmail.com"
      }).then(result => {
        result = JSON.parse(result)
        return result[0].id
      }).catch(error => {
        console.log(error)
      })
    }
    const id = await lookUp()
    const portfolio = () => {
      return requestPromise({
        method: 'get',
        url: 'http://localhost:3000/api/portfolio/' + id
      }).then(result => {
        return result
      }).catch(error => {
        console.log(error)
      })
    }
    const ledger = async () => {
      return requestPromise({
        method: 'get',
        url: 'http://localhost:3000/api/ledger/' + id
      }).then(result => {
        return result
      }).catch(error => {
        console.log(error)
      })
    }
    const getLedger = await ledger()

    const getPortfolio = await portfolio()
    const jsonPortfolio = JSON.parse(getPortfolio)
    let parseLedger = JSON.parse(getLedger)
    console.log(jsonPortfolio)
    let promiseLedger = await new Promise.map(parseLedger, entry => {
      let cleaned = []
      let date = entry.createdAt
      let dateTrimmed = date.substring(0, date.indexOf('T'))
      let total = entry.stock_count * entry.purchase_price
      return {
        id: entry.id,
        symbol: entry.symbol,
        stock_count: entry.stock_count,
        purchase_price: entry.purchase_price,
        date: dateTrimmed,
        total_gain: total,
      }
    }).then((ledger) => {
      jsonPortfolio["Ledger"] = ledger
      jsonPortfolio["id"] = id
    })
     
    return jsonPortfolio
}
}  

  

/* GET home page. */
router.get('/', async (req, res, next) => {
  //console.log(req.user)
  try {
    const portfolio = await checkLoggedIn(req.user)
    //console.log(portfolio)
    res.render('index', portfolio);
  } catch (e) {
    next(e)
  }
  
});

router.get('/login', passport.authenticate('auth0', {
  clientID: env.AUTH0_CLIENT_ID,
  domain: env.AUTH0_DOMAIN,
  redirectUri: env.AUTH0_CALLBACK_URL,
  responseType: 'code',
  audience: 'https://' + env.AUTH0_DOMAIN + '/userinfo',
  scope: 'openid profile'}),
  (req, res) => {
    res.redirect("/");
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/callback',
  passport.authenticate('auth0', {
    failureRedirect: '/failure'
  }),
  (req, res) => {
    res.redirect(req.session.returnTo || '/');
  }
);


router.get('/failure', (req, res) => {
  let error = req.flash("error");
  let error_description = req.flash("error_description");
  req.logout();
  res.render('failure', {
    error: error[0],
    error_description: error_description[0],
  });
});

module.exports = router;