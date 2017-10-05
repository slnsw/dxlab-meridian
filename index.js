const express = require('express');
const app = express();
const path = require('path');

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.use(express.static('public'));

app.listen(3000, function () {
  console.log('App listening on port 3000!')
});

if (process.env.ENV === 'development') {
  const browserSync = require('browser-sync');
  browserSync({
    server: 'public',
    files: ['public/**.*'],
    open: false
  });
}
