const port = 8000;
const express = require('express');
const app = express();
const expressLayout = require('express-ejs-layouts');

app.use(express.static('./assets'));
app.use(expressLayout);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use('/', require('./routes'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err) {
    if(err) {
        console.log('404');
        return;
    }
    console.log('server running');
});