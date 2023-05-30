const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

// get user list
const getUsersList = async (req, res) => {
  try {
    const usersList = await User.find({});

    //if users list is empty then this block executes
    if (!usersList.length) {
      return res.status(200).json({
        data: [],
        message: "No users Present in the database",
      });
    }
    // if users list is available then sending it into response
    return res.status(200).json({
      data: usersList,
      message: "Users List Fetched successfully",
    });
  } catch (error) {
    // If error occur while getting data from the database
    console.log(error);
    return res.status(500).json({
      message: "Error While Fetching UserList",
    });
  }
};

const registerUser = async (req, res) => {
  try {
    let { name, email, password, dept, isAdmin = isAdmin ?? false } = req.body;

    // Check for duplicate email
    const duplicate = await User.findOne({ email }).lean().exec();

    if (duplicate) {
      return res.status(409).json({
        data: {},
        message: "Email Already Exists",
      });
    }

    // Hash Password
    const hashedPwd = await bcrypt.hash(password, 10); // 10 salt rounds

    const userObject = { name, email, password: hashedPwd, dept, isAdmin };
    // Create User
    const user = await User.create(userObject);
    return res.status(201).json({
      data: user,
      message: "User Created Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      data: {},
      message: "Error While Creating User",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }

    // if password is valid then generating jwt token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "nothing",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "User logged in successfully",
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          dept: user.dept,
          isAdmin: user.isAdmin,
        },
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      data: {},
      message: "Error While Logging In User",
    });
  }
};

const deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id).then((user) => {
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    } else {
      return res.status(200).json({
        message: "User deleted successfully",
      });
    }
  }).catch((err) => {
    return res.status(500).json({
      message: `Error while deleting user ${err.message}`
    })
  })
};

const changeUserStatus = async (req, res) => {
  // atyare khali change karai de and pachi condition mukvani che ke admin check karu pela and admin hoy to j change kari shake
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // if (user.isAdmin) {
    //   return res.status(409).json({
    //     message: "User is Admin",
    //   });
    // }

    user.isAdmin = !user.isAdmin;
    await user.save();
    let resultedUser = {
      name: user.name,
      email: user.email,
      dept: user.dept,
      isAdmin: user.isAdmin,
    };
    return res.status(200).json({
      user: resultedUser,
      message: "User status changed successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      data: {},
      message: "Error While Changing User Status",
    });
  }
};

module.exports = { registerUser, loginUser, changeUserStatus, getUsersList, deleteUser };
