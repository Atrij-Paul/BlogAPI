import User from "../model/User";
import bcrypt from "bcryptjs";

export const getAllUser = async(req , res , next) =>{
    let users;
    try{
        users = await User.find();
    }catch(err){
        console.log(err)
    }
    if(!users){
        return res.status(404).json({message : "No users Found"});
    }
    return res.status(200).json({users});
}

export const signup = async(req , res , next) =>
{
    const{Name , email , password} = req.body;

    let existingUser;
    try{
        existingUser = await User.findOne({email});
    }catch(err){
        console.log(err);
    }
    if (existingUser)
    {
        return res.status(400).json({message : "User Already Exist! Login Instead!!"})
    }

    const hashedPassword = bcrypt.hashSync(password);  //hashing syncing
    const user = new User(
        {
            Name,
            email,
            password : hashedPassword,
            blogs : []
        });
    try{
       await user.save();   //saves this new document 
    }catch(err){
        console.log(err); 
    }
    return res.status(201).json({user})  //201 means created 
}

export const login = async(req , res , next) =>
{
    const{email , password} = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email});
    }catch(err){
        console.log(err);
    }
    if(!existingUser){
        res.status(404).json({message : "Could not fins the user with this Email"})
    } 

    const isPasswordCorrect = bcrypt.compareSync(password , existingUser.password);
    if(!isPasswordCorrect)
    {
        res.status(400).json({message : "Incorrect Password"})
    }

    return res.status(200).json({message : "Login successfull"});
} 