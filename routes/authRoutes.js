const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getAllUsers,
  getProfile,
  changePassword,
  updateProfile,
  uploadAvatar,
} = require("../controllers/authController");

const {
  protect,
  adminOnly,
} = require("../middlewares/authMiddleware");

const uploadAvatarMiddleware =
  require("../middlewares/uploadAvatar");

// Auth Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Users
router.get(
  "/users",
  protect,
  adminOnly,
  getAllUsers
);

// Profile
router.get(
  "/profile",
  protect,
  getProfile
);

router.put(
  "/profile",
  protect,
  updateProfile
);

router.patch(
  "/change-password",
  protect,
  changePassword
);

// Avatar Upload Debug Version
router.patch(
  "/avatar",
  protect,
  (req, res, next) => {
    uploadAvatarMiddleware.single("avatar")(
      req,
      res,
      function (err) {
        if (err) {
          console.log(
            "MULTER ERROR =>",
            err
          );

          return res.status(500).json({
            success: false,
            message: err.message,
            error: err,
          });
        }

        console.log(
          "MULTER SUCCESS =>",
          req.file
        );

        next();
      }
    );
  },
  uploadAvatar
);

module.exports = router;