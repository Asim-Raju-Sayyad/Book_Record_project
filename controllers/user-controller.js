const { UserModel, BookModel } = require("../models");
const { find } = require("../models/user-model");
// const userModel = require("../models/user-model");

// router.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     data: users,
//   });
// });
exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find();

  if (users.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No Users Found In The DB",
    });
  }
  res.status(200).json({
    success: true,
    message: "These are the user info: ",
    data: users,
  });
};


// router.get("/:id", (req, res) => {
//   // const  id  = req.params.id;
//   const { id } = req.params;
//   console.log(req.params);
//   const user = users.find((each) => each.id === id);
//   if (!user) {
//     return res.status(404).json({
//       success: false,
//       message: "User Doesn't Exist !!",
//     });
//   }
//   return res.status(200).json({
//     success: true,
//     message: "User Found",
//     data: user,
//   });
// });

exports.getSingleUserById = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById({ _id: id });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Doesn't Exist !!",
    });
  }
  return res.status(200).json({
    success: true,
    message: "User Found",
    data: user,
  });
};


// router.post("/", (req, res) => {
//   const { id, name, surname, email, subscriptionType, subscriptionDate } =
//     req.body;

//   const user = users.find((each) => each.id === id);

//   if (user) {
//     return res.status(404).json({
//       success: false,
//       message: "User With The ID Exists",
//     });
//   }

//   users.push({
//     id,
//     name,
//     surname,
//     email,
//     subscriptionType,
//     subscriptionDate,
//   });

//   return res.status(201).json({
//     success: true,
//     message: "User Added Succesfully",
//     data: users,
//   });
// });

exports.createNewUser = async (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;

  const newUser = await UserModel.create({
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });

    return res.status(201).json({
      success: true,
      message: "User Added Succesfully",
      data: newUser,
    });
};


// router.put("/:id", (req, res) => {
//   const { id } = req.params;
//   const { data } = req.body;

//   const user = users.find((each) => each.id === id);
//   if (!user) {
//     return res.status(404).json({
//       success: false,
//       message: "User Doesn't Exist !!",
//     });
//   }
//   const updateUserData = users.map((each) => {
//     if (each.id === id) {
//       return {
//         ...each,
//         ...data,
//       };
//     }
//     return each;
//   });
//   return res.status(200).json({
//     success: true,
//     message: "User Updated !!",
//     data: updateUserData,
//   });
// });

exports.updateUserData = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const updatedUserDate = await UserModel.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        ...data,
      },
    },
    { new: true }
  );
  return res.status(200).json({
    success: true,
    message: "User Updated !!",
    data: updatedUserDate,
  });
};



// router.delete("/:id", (req, res) => {
//   const { id } = req.params;
//   const user = users.find((each) => each.id === id);
//   if (!user) {
//     return res.status(404).json({
//       success: false,
//       message: "User Doesn't Exist !!",
//     });
//   }
//   const index = users.indexOf(user);
//   users.splice(index, 1);

//   return res
//     .status(200)
//     .json({ success: true, message: "Deleted User..", data: users });
// });

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.deleteOne({ _id: id });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Doesn't Exist !!",
    });
  }
  return res
    .status(200)
    .json({ success: true, message: "Deleted User..", data: users });
};
