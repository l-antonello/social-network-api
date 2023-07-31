const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  // updateUser,
  deleteUser,
  // addFriend,
  // removeFriend,
  addReaction,
  removeReaction,
} = require("../../controllers/userController");

router.route("/").get(getUsers).post(createUser);

router.route("/:userId").get(getSingleUser).delete(deleteUser);

// router.route("/:userId/friends").post(addFriend);

// router.route("/:userId/friends/:friendId").delete(removeFriend);

router.route("/:thoughtId/reactions").post(addReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);


module.exports = router;
