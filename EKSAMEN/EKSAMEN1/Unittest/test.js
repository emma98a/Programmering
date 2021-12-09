const chai = require("chai");
const app = require('../server.js');
const {expect} = require('chai');
const chaiHttp = require('chai-http');
//const { users } = require("../database");

chai.should();
chai.use(chaiHttp);

describe(`DELETE /users/create`, () =>
    it('should post my added product',(done) => {
        chai
            .request(app)
            .get('/users/create')
            .end((err, res) => {

                //check if statuscode is 200
                expect(res.status).to.equal(200);

                expect(err).to.be.null;

                expect(res.body).to.be.an('object');

                expect(res.body).to.not.be.an('array');

                done();
            })
    }))