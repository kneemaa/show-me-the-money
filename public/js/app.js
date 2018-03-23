
var lock = new Auth0Lock('aJPXuic5MPSYv35id6DoDxl7ZJJP2rtT', 'devious.auth0.com', {
  auth: {
  	domain: 'devious.auth0.com',
  	audience: 'https://devious.auth0.com/userinfo',
    redirectUrl: 'http://localhost:3000/callback',
    responseType: 'code',
    params: {
      scope: 'openid profile' // Learn about scopes: https://auth0.com/docs/scopes
    }
  }
});
