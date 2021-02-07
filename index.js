const port = 8000;
const express = require('express');
const app = express();

app.use('/', require('./routes'));

app.listen(port, function(err) {
    if(err) {
        console.log('404');
        return;
    }
    console.log('server running');
});