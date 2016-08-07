var opbeat = require('opbeat').start()

var express = require('express');
var multer  = require('multer');
// var baby = require('babyparse');
var parse = require('csv-parse');
var upload = multer({ dest: 'uploads/' });
fs = require('fs');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(opbeat.middleware.express())

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.post('/upload', upload.single('csv_file'), function (req, res, next) {
  console.log(req.file.filename);
  res.redirect('/browser?csv='+req.file.filename + '&page=1');
});

app.get('/browser', function(req, res){
  var filename = req.query.csv;
  var page = parseInt(req.query.page);

  fs.readFile('uploads/' + filename, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    parse(data, {relax: true, skip_empty_lines: true}, function(err, lines){
      console.log(lines);
      if(page < 1){
        page = 1;
      } else if (page >= lines.length) {
        page = lines.length - 1;
      }
      console.log(lines[page]);
      var lastPrice = "$" + (parseInt(lines[page][4]) / 100);
      var currPrice = "$" + (parseInt(lines[page][5]) / 100);
      var priceDrop = "$" + (parseFloat(lines[page][6]));
      res.render('pages/browser', {
        productName: lines[page][2],
        merchant: lines[page][0],
        productUrl:lines[page][3],
        productId: lines[page][1],
        lastPrice: lastPrice,
        currentPrice: currPrice,
        priceDrop: priceDrop,
        prevPage: page - 1,
        nextPage: page + 1,
        filename: filename
      });
    });
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
