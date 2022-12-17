const { application, response, Router } = require('express');
const express = require('express');
const taskRouter = express.Router();
const pool = require('./modules/pool.js');

taskRouter.get('/', (req,res) => {
    console.log('In GET taskRouter');
    let sqlQuery = 
    `SELECT * FROM "task_list"
        ORDER BY "id";`
    pool.query(sqlQuery)
    .then((response) => {
        // console.log(response);
        res.send(response.rows);
    })
    .catch((error) => {
        console.log('Error in GET taskRouter: ', error);
    })
})




module.exports = taskRouter;