module.exports = app => {
  const { verifySignUp } = require("../middlewares");
  const { authController } = require("../controllers");
  
  var router = require("express").Router();

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.post(
    "/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    authController.signup
  );

  router.post("/signin", authController.signin);

  app.use('/api/auth', router);
};
