const express = require('express');
const route = require('./routes/client/index.route');
const routeAdmin = require('./routes/admin/index.route');
require('dotenv').config();
const database = require('./config/database');
const systemConfig = require('./config/system');
const methodOverride = require('method-override')

database.connect();

const app = express();
const port = process.env.PORT;

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'));
app.use(methodOverride('_method'))

// App Local Variables 
app.locals.prefixAdmin =  systemConfig.prefixAdmin;

// Routes
route(app);
routeAdmin(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})