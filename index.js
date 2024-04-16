var express = require('express');
var cors = require('cors');
require('dotenv').config()

// multer
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  // Extract file information from the request
  const { originalname, mimetype, size } = req.file;

  // Send the extracted information as a response
  res.json({
      name: originalname,
      type: mimetype,
      size: size
  });
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
