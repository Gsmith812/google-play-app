const supertest = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('GET /apps endpoint', () => {
    it('requires sort to include either app or rating', () => {
        return supertest(app)
            .get('/apps')
            .query({sort: 'title'})
            .expect(400, 'Must be sorted by app or rating');
    });
    it('returns the entire list of apps if no querys present', () => {
        return supertest(app)
            .get('/apps')
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf.at.least(1);
                const verifyKeys = res.body.map(app => {
                    expect(app).to.include.all.keys(
                    'App', 'Category', 'Rating', 'Reviews', 'Size', 'Installs',
                    'Type', 'Price', 'Content Rating', 'Genres', 'Last Updated', 'Last Updated',
                    'Current Ver', 'Android Ver'
                    );
                });
                
            });
    });
    it('returns a 400 status if genres is not included in genreArr', () => {
        return supertest(app)
            .get('/apps')
            .query({genres: 'Misc'})
            .expect(400, 'Genre must be one of the following: Action, Puzzle, Strategy, Casual, Arcade, Card')
    })
});