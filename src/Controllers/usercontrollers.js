const userModells = require("../Modells/usermodells");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "your-secret-key";

const register = async function (req, res) {
  try {
    const { name, email, password, confirmPassword} = req.body;
    const existingUser = await userModells.findOne({ email: email });
    if (existingUser) {
      return res.status(401).json({ message: "Username already exists" });
    }
    //Checking the Password and Confirm Password are same or not
    if (password !== confirmPassword) {
      return res.status(422).json({ message: "Passwords do not match" });
    }
    let hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModells({
      name: name,
      email: email,
      password: hashedPassword,
    });
     await newUser.save();
    res
      .status(200)
      .json({ id: newUser._id, msg: "User Registered Succesfully" });
  } catch (error) {
    console.log(`Error in register ${error}`);
  }
};

const login = async function (req, res) {
  let { email, password } = req.body;
  try {
    let user = await userModells.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    let token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: "Invalid User" + error });
  }
};



module.exports = { register, login };
