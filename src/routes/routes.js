var router = require("express").Router();
const { register, login }=require("../Controllers/usercontrollers");


router.post("/user-register",register),
router.post("/login",login);



module.exports=router;
