const express = require('express');
const bodyParser = require('body-parser');
const taskRouter = require('./taskRouter')
const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('server/public'));

app.use('/task_list', taskRouter)

app.listen(PORT, () => {
    console.log('listening on port', PORT)
});