# Show-Me-The-Money

## Authentication
### Packages Used
* cookie-parser
* passport
* passport-auth0
* dotenv
* express-session
* connect-ensure-login

### Setup Instructions
> These steps assume that you've created a client app within Auth0

1. Create a `.env` file at the root of your file structure and put the following variables in, do not put quotes around your values
  ```AUTH0_CLIENT_ID=[ID_HERE]```
  ```AUTH0_DOMAIN=[your-sub-domain].auth0.com```
  ```AUTH0_CLIENT_SECRET=[CLIENT_SECRET_HERE]```
2. Update the `index.handlebar` file, replace the first argument after `Auth0Lock` with your updated Client_ID and update your domain where appropriate
3. If necessary, update the redirect URL for your environment
  * Located in:
    * server.js
    * views/index.handlebars
    * routes/index.js
