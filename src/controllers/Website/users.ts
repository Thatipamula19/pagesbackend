const userSchema = require('../../models/Website/users');
const bcrypt = require("bcryptjs");
import jwt from "jsonwebtoken";

exports.addUser = async (req, res, next) =>{
    const fullname = req.body.fullname;
    const email = req.body.email;
    const password = req.body.password;
    const team = req.body.team;
    const role = 'NewUser';
    const city = req.body.city;
    const centerName = req.body.centerName;
    const pageUrl = req.body.pageUrl;
    let user = await userSchema.findOne({email: email});
    if(user?.email == email){
        res.status(401).json({
            message: 'User is  already exits!',
          }); 
    } else {
    await bcrypt.hash(password, 12).then(hasPassword=>{
            const addUser = new userSchema({
                fullname: fullname,
                email : email,
                password: hasPassword,
                team: team,
                role: role,
                city: city,
                centerName: centerName,
                pageUrl: pageUrl
            });
        
           addUser.save().then(result=>{
                res.status(201).json({
                    message: 'Your Account is Created successfully!',
                    users: result
                  });
            })
        }).catch(err => {
            res.status(500).json({
                message: "Adding User Failed!"
            });
        });
        
    }

}

exports.updateRole = async (req, res, next) => {
    const userId = req.body.userId;
    const role = req.body.role;
    const city = req.body.city;
    const centerName = req.body.centerName;
    const pageUrl = req.body.pageUrl;

    let user = await userSchema.findById(userId);
    user.role = role;
    user.city = city;
    user.centerName = centerName;
    user.pageUrl = pageUrl;
    await user.save().then(result => {
        res.status(200).json({
            message: 'User Updated successfully!',
            userDetails: result,
        });
    });
}

exports.getUsers = async (req, res, next) => {
    await userSchema.find().then(result => {
        res.status(200).json({
            message: 'Users Fetched successfully!',
            users: result.map(re=>{
                return {
                    email: re.email,
                    fullname: re.fullname,
                    role: re.role,
                    team: re.team,
                    id: re._id,
                    city: re.city,
                    centerName: re.centerName,
                    pageUrl: re.pageUrl
                }
            })
        });
    });
}

exports.getUser = async (req, res, next) => {
    const userId = req.params.userId;
    await userSchema.findOne(userId).then(result => {
        res.status(200).json({
            message: 'User Fetched successfully!',
            user: {
                email: result.email,
                fullname: result.fullname,
                role: result.role,
                team: result.team,
                id: result._id,
                city: result.city,
                centerName: result.centerName,
                pageUrl: result.pageUrl
            }
        });
    });
}

exports.deleteUser = async (req, res, next) => {
    const userId = req.body.userId;
    await userSchema.deleteOne({_id:userId}).then(result => {
        res.status(200).json({
            message: 'User Deleted successfully!',
            users: result
        });
    });
}

exports.loginUser = async (req, res, next)=>{
    const email = req.body.email;
    const password = req.body.password;
    let user = await userSchema.findOne({email: email});
    if(!user?.fullname){
        res.status(404).json({
            message: 'User is  not exits!',
          }); 
    } else {
    await bcrypt.compare(password, user.password).then(result=>{
        if (!result) {
            res.status(401).json({
                message: "Invalid Password"
            })
        } else {
            const token = jwt.sign(
                { username: user.fullname, userId: user._id },
                "secret_this_is_employee_login",
                { expiresIn: "1h" }
            );
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                userId: user._id,
                userDetails: {
                    userId: user?._id,
                    role: user?.role,
                    fullname: user?.fullname,
                    team: user?.team,
                    city: user?.city,
                    centerName: user?.centerName,
                    pageUrl: user?.pageUrl
                },
                message: 'User LoggedIn successfully!',
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: "User Login Failed!"
        });
    });
        
    }
}