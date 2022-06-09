const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// TODO - Add routes here...
//use '/items' for all endpoints

router.get('/', (req, res) => {
    const sqlText = `SELECT * FROM items ORDER BY name ASC;`;
    pool.query(sqlText)
        .then((result) => {
            console.log(`Got back from the database`, result);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500); // Good server always responds
        })
})

router.post('/', (req, res) => {
    const items = req.body;
    const sqlText = `INSERT INTO items ("name", "qty", "unit", "isPurchased")
                     VALUES ($1, $2, $3, $4)`;
    pool.query(sqlText, [items.name, items.qty, items.unit, items.isPurchased])
        .then((result) => {
            console.log(`Added item to the database`, items);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        })
});


router.put('/', (req, res) => {
    //update database
    const sqlText = `
        UPDATE items
        SET isPurchased = $2
        WHERE id = $1`
    //set variables for params
    const deleteId = req.params.id;
    const isPurchased = req.params.isPurchased;
    //assign variables to params
    const sqlParams = [deleteId, isPurchased];
    //send sql query to database
    pool.query(sqlText,sqlParams)
    .then((result) => {
        res.send(result.row);
        console.log('in items.router router.put then',)
    })
    .catch((error) => {
        console.log('error making database update', error);
    });
});

router.delete('/', (req, res) => {
    //delete from database sql command
    const sqlText = `
    DELETE from items
    WHERE id = $1`
    //which id to delete from items
    const sqlParams = req.params.id;
    //send query to database
    pool.query(sqlText, sqlParams)
    .then((result) => {
        res.send(result.row);
        console.log('in items.router router.delete then')
    })
    .catch((error) => {
        console.log('error in deleting from db', error)
    });
});

module.exports = router;