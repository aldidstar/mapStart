"use strict";

const chai = require("chai");
const chaiHTTP = require("chai-http");

const server = require("../app");
const User = require("../models/User");

const should = chai.should();
chai.use(chaiHTTP);

describe("users", function () {
  // setiap sebelum melakukan test saya tambahkan satu data "tes@gmail.com"
  beforeEach(function (done) {
    let user = new User({
      email: "tes@gmail.com",
    });

    user.save(function (err) {
      done();
    });
  });

  // setiap habis melakukan test saya kosongkan data di collection user
  afterEach(function (done) {
    User.findOneAndRemove(
      {
        email: "tes@gmail.com",
      },
      function (err) {
        done();
      }
    );
  });

  it("seharusnya mendapatkan semua daftar users yang ada di table User dengan metode GET", function (done) {
    chai
      .request(server)
      .get("/users")
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("array");
        res.body[res.body.length - 1].should.have.property("_id");
        res.body[res.body.length - 1].should.have.property("email");
        res.body[res.body.length - 1].email.should.equal("tes@gmail.com");
        done();
      });
  });

  it("seharusnya menambahkan satu user pada register dengan metode POST", function (done) {
    chai
      .request(server)
      .post("/users/register")
      .send({ email: "coba@gmail.com", password: "123", retypepassword: "123" })
      .end(function (err, res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.data.should.have.property("email");
        res.body.token
        res.body.data.email.should.equal("coba@gmail.com");
        User.findByIdAndDelete(res.body._id)
          .then((data) => {
            done();
          })
          .catch((err) => {
            throw err;
          });
      });
  });

  it("seharusnya menambahkan satu user pada login dengan metode POST", function (done) {
    chai
      .request(server)
      .post("/users/login")
      .send({ email: "coba@gmail.com", password: "123" })
      .end(function (err, res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.data.should.have.property("email");
        res.body.token
        res.body.data.email.should.equal("coba@gmail.com");
        User.findByIdAndDelete(res.body._id)
          .then((data) => {
            done();
          })
          .catch((err) => {
            throw err;
          });
      });
  });

  it("seharusnya menambahkan satu user pada check dengan metode POST", function (done) {
    chai
      .request(server)
      .post("/users/login")
      .send({ email: "coba@gmail.com", password: "123" })
      .end( function (err, res) {
        let token =  res.body.token
        chai
          .request(server)
          .post("/users/check")
          .send({ token: token })
          .end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a("object");
            res.body.should.have.property("valid");
            res.body.valid.should.equal(true);
            User.findByIdAndDelete(res.body._id)
              .then((data) => {
                done();
              })
              .catch((err) => {
                throw err;
              });
          });
      });
  }),
    it("seharusnya menghancurkan token saat logout dengan metode GET", function (done) {
      User.findOne({ email: "tes@gmail.com" })
        .then((data) => {
          chai
            .request(server)
            .get("/users/destroy/" + data._id)
            .end(function (err, res) {
              res.should.have.status(201);
              res.should.be.json;
              res.body.should.be.a("object");
              res.body.should.have.property("logout");
              res.body.logout.should.equal(true);
              done();
            });
        })
        .catch((err) => {
          throw err;
        });
    });

    
});
