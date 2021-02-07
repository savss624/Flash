const express = require('express');
const port = 8000;
const app = express();

app.use('/', )

app.listen(function(err) {
    if(err) {
        console.log('404');
        return;
    }
    console.log('server running');
});