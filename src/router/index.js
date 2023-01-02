import { Router } from "express";
import { body } from "express-validator";

import mailController from "../controllers/mail-controller.js";
import phoneController from "../controllers/phone-controller.js";
import placeController from "../controllers/place-controller.js";
import userController from "../controllers/user-controller.js";

import authMiddleware from "../middlewares/auth-middleware.js";

const router = new Router();

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 5, max: 16 }),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);

router.get("/mail/activate/:link", mailController.activateLink);
router.get("/mail/send", mailController.sendLink);

router.get("/users", authMiddleware, userController.getUsers);
router.delete("/users/:_id", userController.deleteAccount);

router.get("/phone/:phone", phoneController.sendSms);
router.post("/phone", phoneController.verifySms);
router.post(
  "/registration/phone",
  body("phone").isMobilePhone(),
  phoneController.signupByPhone
);
router.post(
  "/login/phone",
  body("phone").isMobilePhone(),
  phoneController.loginByPhone
);

router.get("/place", authMiddleware, placeController.getPlaces);
router.get("/place/:_id", placeController.getOnePlace);
router.post("/place", placeController.createPlace);
router.put("/place/:_id", placeController.updatePlace);
router.delete("/place/:_id", placeController.deletePlace);

export default router;
