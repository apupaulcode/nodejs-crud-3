const express = require('express');
const route = express.Router();
const Club = require('../models/club')
route.get('/', (req, res, next) => {
    Club.find()
        .then(docs => {
            res.render('home', {
                clubs: docs,
                title:'Home'
            });
        })
        .catch(err => {
            console.log('Something Wrong With DB:', err);
            // Handle the error, maybe send an error response to the client
            next(err); // Pass the error to the next middleware
        });
});


route.post('/add',(req,res,next)=>{
    const name = req.body.name;
    const players = req.body.players;
    const coach = req.body.coach;

    console.log(name,players,coach);

    const uclClub = new Club({
        name,
        players,
        coach
    })
    uclClub.save()
    .then(res.redirect('/'))
    .catch(err=>console.log('There is some error'));
})

route.get('/edit/:id', (req, res, next) => {
    console.log(req.params.id);
    Club.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(docs => {
            res.render('edit', {
                club: docs
            });
            res.redirect('/');
        })
        .catch(err => {
            console.log("Can not retrieve the data:", err);
            next(err);
        });
});
route.post('/edit/:id', (req, res, next) => {
    Club.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(docs => {
            // Redirect to the home page after updating
            res.redirect('/');
        })
        .catch(err => {
            console.log("Can not retrieve the data:", err);
            next(err);
        });
});
route.get('/delete/:id', (req, res, next) => {
    Club.findByIdAndDelete(req.params.id, req.body, { new: true })
        .then(docs => {
            // Redirect to the home page after updating
            res.redirect('/');
        })
        .catch(err => {
            console.log("Can not retrieve the data:", err);
            next(err);
        });
});




module.exports = route;