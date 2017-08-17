const express = require('express'),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      app = express(),
      checkForSession = require('./middlewares/checkForSession'),
      sc = require('./controllers/swag_controller'),
      ac = require('./controllers/auth_controller'),
      cc = require('./controllers/cart_controller'),
      sec = require('./controllers/search_controller'),                  
    //   config = require('./config'),
      port = 3000;

// ========= Top-Level Middleware ========= //
app.use(bodyParser.json());
app.use(session({
    secret: 'And, as I am an honest Puck, if we have unerned luck, now to scape the serpent\'s tongue, we shall make amends ere long. Give us your hands, if we be friends, and Robin shall restore amends.',
    saveUninitialized: false,
    resave: false
}))
app.use(checkForSession);
app.use( express.static( `${__dirname}/../public/build` ) );

app.get('/api/swag', sc.read);
app.post('/api/login', ac.login);
app.post('/api/register', ac.register);
app.post('/api/signout', ac.signout);
app.get('/api/user', ac.getUser);

app.post('/api/cart', cc.add); //takes a query of id
app.post('/api/cart/checkout', cc.checkout);
app.delete('/api/cart', cc.delete); //takes a query of id

app.get('/api/search', sec.search);



app.listen(port, () => `I'm listening on port ` + port);
