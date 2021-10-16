var express = require("express");
var router = express.Router();
const Map = require("../models/Map");
const helpers = require("../helpers/util");

router.get("/", helpers.verifyToken, function (req, res, next) {
  Map.find({})
    .then((map) => {
      res.json(map);
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});

router.post("/", helpers.verifyToken, function (req, res, next) {
  Map.create(req.body)
    .then((map) => {
      res.status(201).json({
        success: true,
        message: "data have been added",
        data: {
          _id: map._id,
          title: map.title,
          lat: map.lat,
          lng: map.lng
        }
      });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});

router.post("/search", helpers.verifyToken, function (req, res, next) {
  Map.findOne({
    title: req.body.title,
  })
    .then((map) => {
      res.status(200).json({
        _id: map._id,
        title: map.title,
        lat: map.lat,
        lng: map.lng,
      });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});

router.delete("/:id", helpers.verifyToken, function (req, res) {
  Map.findByIdAndRemove(req.params.id)
    .then((map) => {
      res.status(201).json({
        success: true,
        message: "data have been deleted",
        data: {
          _id: map._id,
          title: map.title,
          lat: map.lat,
          lng: map.lng
        }
      });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});

router.get("/:id", helpers.verifyToken, async function (req, res) {
  try {
    const map = await Map.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "data found",
      data: {
        _id: map._id,
        title: map.title,
        lat: map.lat,
        lng: map.lng
      }
    });
  } catch (err) {
    res.status(201).json({
      success: false,
      message: "something wrong",
      err,
    });
  }
});

router.put("/:id", helpers.verifyToken, async function (req, res) {
  try {
    const map = await Map.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json({
      success: true,
      message: "data have been updated",
      data: {
        _id: map._id,
        title: map.title,
        lat: map.lat,
        lng: map.lng,
      },
    });
  } catch (err) {
    res.status(201).json({
      success: false,
      message: "something wrong",
      err,
    });
  }
});

module.exports = router;
