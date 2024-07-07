const User=require("../model/user");
const {v4:uuidv4}=require("uuid");
const {setUser}=require("../service/auth");
const handleUserSignUp=async(req,res)=>{
    const {email,name,password}=req.body;    

    await User.create({name,email,password});

    return res.status(201).json({status:"successfully created"});
};

const loginHandler = async (req, res) => {
    const { email, password } = req.body; 
    
    // Assuming User is your Mongoose model
    const user = await User.findOne({ email, password });

    if (!user) {
        return res.render("login", {
            error: "Invalid Email or Password",
        });
    }

    const token = setUser(user);

    // Set a cookie named "uid" with the token
    res.cookie("uid", token);

    return res.redirect("/api/test");
}



module.exports={handleUserSignUp,loginHandler};