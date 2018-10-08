const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');
const mongoose = require('mongoose');

router.get("/", (req, res, next) => {
    Subscriber.find()
      .exec()
      .then(docs => {
        console.log(docs);
        //   if (docs.length >= 0) {
        res.status(200).json(docs);
        //   } else {
        //       res.status(404).json({
        //           message: 'No entries found'
        //       });
        //   }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

router.post("/", (req, res, next) => {
    const subscriber = new Subscriber({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
    bloodType: req.body.bloodType
    });
    subscriber
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Handling POST requests to /subscribers",
          createdSubscriber: result
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });


  router.get("/:subscriberId", (req, res, next) => {
    const id = req.params.subscriberId;
    Subscriber.findById(id)
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json(doc);
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });
  
   router.patch("/:subscriberId", (req, res, next) => {
    const id = req.params.subscriberId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    Subscriber.update({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        console.log(result);
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }); 
  
  router.delete("/:subscriberId", (req, res, next) => {
    const id = req.params.subscriberId;
    Subscriber.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

module.exports = router;
