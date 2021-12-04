module.exports = app => {

  const { authJwt } = require("../middlewares");
  const { userController } = require("../controllers");

  var router = require("express").Router();

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.get("/all", userController.allAccess);

  router.get(
    "/user",
    [authJwt.verifyToken],
    userController.userBoard
  );

  router.get(
    "/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    userController.moderatorBoard
  );

  router.get(
    "/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.adminBoard
  );

  app.use('/api/test', router);
};
