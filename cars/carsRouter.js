const express = require("express").Router();

const Cars = require("./cars-model");

router.get("/", (req, res) => {
  Cars.get()
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "failed to get car list!",
        error: err
      });
    });
});

router.get("/:id", (req, res) => {
  Cars.getById(req.params.id)
    .then(car => {
      if (car) {
        res.status(200).json(car);
      } else {
        res.status(404).json({ message: "Failed to get car with that id!" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "failed to get car!",
        error: err
      });
    });
});

router.post("/", (req, res) => {
  Cars.add(req.body)
    .then(car => {
      res.status(201).json(car);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "failed to add new car!", error: err });
    });
});

router.delete("/:id", (req, res) => {
  Cars.remove(req.params.id)
    .then(deleted => {
      if (deleted) {
        res.status(200).json({ Removed: deleted });
      } else {
        res
          .status(404)
          .json({ message: "could not find car with provided id" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "failed to delete car!"
      });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Cars.getById(id)
    .then(car => {
      if (car) {
        Cars.update(changes, id).then(updatedCar => {
          res.status(200).json(updatedCar);
        });
      } else {
        res.status(404).json({ message: "Could not find car with given id" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to update car", error: err });
    });
});

module.exports = router;
