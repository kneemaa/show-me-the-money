const jwt = require('express-jwt')
const jwtAuthz = require('express-jwt-authz')
const jwksRsa = require('jwks-rsa')
const checkScopes = jwtAuthz(['read:messages'])


const checkJwt = jwt({
	secret: jwksRsa.expressJwtSecret({
	    cache: true,
	    rateLimit: true,
	    jwksRequestsPerMinute: 5,
	    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
	  }),

	audience: process.env.AUTH0_AUDIENCE,
	issuer: `https://${process.env.AUTH0_DOMAIN}/`,
	algorithms: ['RS256']
})

module.exports = app => {
	app.get('/api/public', function(req, res) {
	  res.json({
	    message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
	  });
	});

	app.get('/api/private', checkJwt, function(req, res) {
	  res.json({
	    message: 'Hello from a private endpoint! You need to be authenticated to see this.'
	  });
	});

	app.get('/api/private-scoped', checkJwt, checkScopes, function(req, res) {
	  res.json({
	    message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
	  });
	});
}