const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('dev'));
app.use(cors());

const playstoreApps = require('./playstore.js');

app.get('/apps' , (req, res) => {
    const { sort, genres } = req.query;
    let results = playstoreApps;
    if(sort) {
        if(!['app', 'rating'].includes(sort)) {
            return res.send('Must be sorted by app or rating');
        }
        results.sort((a,b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        });
    }
    if(genres) {
        const genresArr = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];
        if(genresArr.includes(genres)) {
            filteredGenres = playstoreApps.filter(app => app.Genres.includes(genres));
            results = filteredGenres;
            return res.json(results);
        }
        else {
            return res.status(400).send(`Genre must be one of the following: ${genresArr.join(', ')}`)
        }
        
    }
    return res.json(results);
});

app.listen(8000, () => {
    console.log('Server listening on port 8000');
});