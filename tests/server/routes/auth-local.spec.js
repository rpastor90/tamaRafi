'use strict';
console.log(' in the file')
const mongoose = require('mongoose');
require('../../../server/db/models');
const User = mongoose.model('User');
const expect = require('chai').expect;
const dbURI = 'mongodb://localhost:27017/tamarafi-test';
const clearDB = require('mocha-mongoose')(dbURI);
const supertest = require('supertest');
const app = require('../../../server/app');
const faker = require('faker');


describe('Local auth routes', function(){
	
	beforeEach('Establish DB connection', function(done){
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});
	afterEach('Clear test databse', function(done){
		clearDB(done);
	});

	describe('Login route', function(){

		describe('Nonexistant user', function(){
			it ('should get 401 response and \'Invalid login credentials.\' message.', function(done){
				supertest(app)
				.post('/login').send({firstName: 'Athanasios Mykonos', password: 'GrecianGuys' })
				.expect(401)
				.expect('Invalid login credentials.')
				.end(done)
			})
		})

		describe('Existant user', function(){
			let fakedUser;
			let fakeName = faker.name.firstName();
			let fakeEmail = faker.internet.email();
			let fakePassword = faker.lorem.words();
			let loggedInAgent;
			beforeEach('Create a user', function(done){
				User.create({
					name:fakeName,
					email: fakeEmail,
					password: fakePassword
				})
				.then((user) => {

					fakedUser = user;
					done();
				})
				.then(null, (err) => {done(err)})

			})
			
			it ('should respond with 200 and the loggedIn user', function(done){
				supertest(app)
				.post('/login').send({name: fakeName, password:fakePassword})
				.expect(200)
				.end(function(err, res) {
	                expect(res.body.user).to.include({name: fakeName});
	                expect(res.body.user).to.include({email: fakeEmail});
	                done() 
	            })
	
			})
		})
		
	})
})



