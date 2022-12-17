const { application, response, Router } = require('express');
const express = require('express');
const bodyParser = require('body-parser');
const taskRouter = express.Router();
const pool = require('./modules/pool.js');

taskRouter.get('/', (req,res) => {
    console.log('In GET /task_list');
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

taskRouter.post('/', (req,res) => {
    console.log('In POST /task_list');
    console.log(req.body);

    let sqlQuery = 
    `INSERT INTO "task_list"
    ("status", "task", "due_date")
    VALUES
    ($1, $2, $3);`

    let sqlValues = [req.body.status, req.body.task, req.body.dueDate]
    pool.query(sqlQuery, sqlValues)
    .then((response) => {
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log('Error in POST /task_list: ', error);
        res.sendStatus(500);
    })
})

taskRouter.put('/:id', (req,res) => {
    console.log('In PUT /task_list');
    console.log('req.params:', req.params);
    console.log('req.body:', req.body);

    let sqlQuery = 
    `UPDATE "task_list"
        SET "status"=$1
        WHERE "id"=$2;`;
    let sqlValues = [req.body.status, req.params.id];

    pool.query(sqlQuery, sqlValues)
    .then((response) => {
        console.log(response);
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('Error in PUT /task_list: ', error);
        res.sendStatus(500);
    })
})

module.exports = taskRouter;