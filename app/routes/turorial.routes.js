module.exports = app => {
  const { tutorialController }  = require("../controllers");
  const { uploadFile } = require("../middlewares");
  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", tutorialController.create);

  // upload a file and insert as a avtar for book
  router.post("/:id/upload", uploadFile.single("file"), tutorialController.uploadAvtar);

  // Retrieve all tutorialController
  router.get("/", tutorialController.findAll);

  // Retrieve all published tutorialController
  router.get("/published", tutorialController.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", tutorialController.findOne);

  // Update a Tutorial with id
  router.put("/:id", tutorialController.update);

  // Delete a Tutorial with id
  router.delete("/:id", tutorialController.deleteTutorial);

  // Delete all tutorialController
  router.delete("/", tutorialController.deleteAll);

  app.use('/api/tutorials', router);
};
