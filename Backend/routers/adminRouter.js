const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Model = require('../models/adminModel');

const router = express.Router();

// to add a new user to the database.
router.post('/add', (req, res) => {
    
    new Model(req.body).save()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
            console.log(err);
        });
});

//Fetches all users from the MongoDB collection
router.get('/getall', (req, res) => {
    Model.find()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
            console.log(err);

        });
});

//GET route for retrieving a user by ID 
router.get('/getbyid/:id', (req, res) => {
    Model.findById(req.params.id) // Model.find({city: req.params.city})
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
            console.log(err);
        });
});

//deleting a user by ID
router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
            console.log(err);
        });
});
// PUT route for updating a user by ID
router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
            console.log(err);
        });
});


// Get users by city name
router.get('/getbycity/:city', (req, res) => {
    Model.find({ city: req.params.city })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
            console.error(err);
        });
});

router.post('/authenticate', (req, res) => {
    Model.findOne(req.body)
        .then((result) => {
            if (result) {
                const { _id, name, email } = result;
                const payload = { _id, name, email };

                jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json(err);

                    } else {
                        res.status(200).json({ token });
                    }
                })




            } else {
                //AUTHENTICATION FAILED
                res.status(401).json({ message: 'Invalid credentials' })
            }


        }).catch((err) => {
            res.status(500).json(err);
            console.log(err);

        });
})

// Route to get admin dashboard stats
router.get('/stats', async (req, res) => {
    try {
        const User = require('../models/userModel');
        const Expert = require('../models/expertModel');
        const News = require('../models/addNewsModel');
        const Artical = require('../models/addArticalModel');

        const [userCount, expertCount, newsCount, articalCount] = await Promise.all([
            User.countDocuments(),
            Expert.countDocuments(),
            News.countDocuments(),
            Artical.countDocuments()
        ]);

        res.status(200).json({
            users: userCount,
            experts: expertCount,
            news: newsCount,
            articles: articalCount
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch stats', details: err });
    }
});

module.exports = router;