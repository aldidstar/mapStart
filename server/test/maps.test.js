"use strict";

const chai = require("chai");
const chaiHTTP = require("chai-http");

const server = require("../app");
const Map = require("../models/Map");

const should = chai.should();
chai.use(chaiHTTP);

describe("maps", function () {
  // setiap sebelum melakukan test saya tambahkan satu data "Rubicamp"
  beforeEach(function (done) {
    let map = new Map({
      title: "Rubicamp",
      lat: -6.22,
      lng: 102.22,
    });

    map.save(function (err) {
      done();
    });
  });

  // setiap habis melakukan test saya kosongkan data di collection user
  afterEach(function (done) {
    Map.findOneAndRemove(
      {
        title: "Rubicamp",
      },
      function (err) {
        done();
      }
    );
  });

  it("seharusnya mendapatkan semua daftar yang ada di table Maps dengan metode GET", function (done) {
    chai
      .request(server)
      .post("/users/login")
      .send({ email: "aldi@gmail.com", password: "aldi" })
      .end( function (err, res) {
    chai
      .request(server)
      .get("/maps")
      .set('x-access-token', res.body.token)
      .end(function (err, res) { 
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("array");
        res.body[res.body.length - 1].should.have.property("title");
        res.body[res.body.length - 1].should.have.property("lat");
        res.body[res.body.length - 1].should.have.property("lng");
        res.body[res.body.length - 1].title.should.equal("Rubicamp");
        res.body[res.body.length - 1].lat.should.equal(-6.22);
        res.body[res.body.length - 1].lng.should.equal(102.22);
        done();
      });
    });
  });

  it("seharusnya melakukan pencarian dengan input title dengan metode Post", function (done) {
    chai
    .request(server)
    .post("/users/login")
    .send({ email: "aldi@gmail.com", password: "aldi" })
    .end( function (err, res) {
        chai
        .request(server)
        .post("/maps/search")
        .send({ title: "Rubicamp" })
        .set('x-access-token', res.body.token)
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("_id");
        res.body.should.have.property("title");
        res.body.should.have.property("lat");
        res.body.should.have.property("lng");
        res.body.title.should.equal("Rubicamp");
        res.body.lat.should.equal(-6.22);
        res.body.lng.should.equal(102.22);
        Map.findById(res.body._id)
          .then((data) => {
            done();
          })
          .catch((err) => {
            throw err;
          });
      });
    });
  });

    it("seharusnya bisa memperbaharui melalui path /maps/<id> PUT", function (done) {
    chai
    .request(server)
    .post("/users/login")
    .send({ email: "aldi@gmail.com", password: "aldi" })
    .end( function (err, res) {
      Map.findOne({ title: "Rubicamp" }).then((data) => {

        chai
          .request(server)
          .put("/maps/" + data._id)
          .send({ title: "Rubicamp Super", lat: -6.22, lng: 102.22 })
          .set('x-access-token', res.body.token)
          .end(function (error, res) {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a("object");
            res.body.data.should.have.property("_id");
            res.body.data.should.have.property("title");
            res.body.data.should.have.property("lat");
            res.body.data.should.have.property("lng");
            res.body.data.title.should.equal("Rubicamp Super");
            res.body.data.lat.should.equal(-6.22);
          res.body.data.lng.should.equal(102.22);
          
            done();
          });
      })
      .catch((err) => {
        throw err;
      });
    });
});

  it("seharusnya menambahkan satu map dengan metode POST", function (done) {
    chai
    .request(server)
    .post("/users/login")
    .send({ email: "aldi@gmail.com", password: "aldi" })
    .end( function (err, res) {
    chai
      .request(server)
      .post("/maps")
      .send({ title: "Rubicamp Super", lat: -6.22, lng: 102.22 })
      .set('x-access-token', res.body.token)
      .end(function (err, res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.data.should.have.property("title");
        res.body.data.should.have.property("lat");
        res.body.data.should.have.property("lng");
        res.body.data.title.should.equal("Rubicamp Super");
        res.body.data.lat.should.equal(-6.22);
        res.body.data.lng.should.equal(102.22);
        Map.findByIdAndDelete(res.body.data._id)
          .then((data) => {
            done();
          })
          .catch((err) => {
            throw err;
          });
      });
    });
  });

  it("seharusnya menghapus satu map id path /maps/<id> DELETE", function (done) {
    chai
    .request(server)
    .post("/users/login")
    .send({ email: "aldi@gmail.com", password: "aldi" })
    .end( function (err, res) {
    Map.findOne({ title: "Rubicamp" }).then((data) => {
      chai
        .request(server)
        .delete("/maps/" + data._id)
      .set('x-access-token', res.body.token)

        .end(function (error, res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.data.should.have.property("title");
          res.body.data.should.have.property("lat");
          res.body.data.should.have.property("lng");
          res.body.data.title.should.equal("Rubicamp");
          res.body.data.lat.should.equal(-6.22);
          res.body.data.lng.should.equal(102.22);
          Map.findByIdAndDelete(res.body.data._id)
          done();
        });
    })
    .catch((err) => {
        throw err;
      });
  });
});


  it("seharusnya melakukan pencarian dengan id path /maps/<id> FIND metode GET", function (done) {
    chai
    .request(server)
    .post("/users/login")
    .send({ email: "aldi@gmail.com", password: "aldi" })
    .end( function (err, res) {
    Map.findOne({ title: "Rubicamp" })
    .then((data) => {
    chai
      .request(server)
      .get("/maps/" + data._id)
      .set('x-access-token', res.body.token)

      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.data.should.have.property("_id");
        res.body.data.should.have.property("title");
        res.body.data.should.have.property("lat");
        res.body.data.should.have.property("lng");
        res.body.data.title.should.equal("Rubicamp");
        res.body.data.lat.should.equal(-6.22);
        res.body.data.lng.should.equal(102.22);
        
        done();
          })
        })
        .catch((err) => {
          throw err;
      });
    });

    });

});
