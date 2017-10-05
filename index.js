const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 3000;

// app.set('view engine', 'ejs');

// app.get('/globe/miranda', function(req, res) {
//   res.render('index', {
//     globe: 'miranda'
//   });
// });
//
// app.get('/globe/coronelli', function(req, res) {
//   res.render('index', {
//     globe: 'coronelli'
//   });
// });

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.use(express.static('public'));

app.listen(port, function() {
  console.log(`App listening on port ${port}!`);
});

if (process.env.ENV === 'development') {
  const browserSync = require('browser-sync');
  browserSync({
    server: 'public',
    files: ['public/**.*'],
    open: false
  });
}
