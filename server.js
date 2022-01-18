let project_data = {};
const express = require('express');
const bodyParser = require('body-parser');
const app_exp = express();
const cors = require('cors');
const data = [];

app_exp.use(bodyParser.urlencoded({ extended: false }));
app_exp.use(bodyParser.json());
app_exp.use(cors());
app_exp.use(express.static('website'));
app_exp.post('/add', addInfo);
function addInfo(req, res) {
  project_data['date'] = req.body.date;
  project_data['temp'] = req.body.temp;
  project_data['content'] = req.body.content;
  res.send(project_data);
}
app_exp.get('/all', getInfo);
function getInfo(req, res) {
  res.send(project_data);
}
const port = 8000;
const server = app_exp.listen(port, listening);

function listening() {
  console.log(`running on localhost: ${port}`);
};
