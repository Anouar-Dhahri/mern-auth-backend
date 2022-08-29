const User = require('./../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Signup = async(req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    
    await User.findOne({
      email: email,
    }).then((user) => {
      if (user) {
        res.json({
          success: false,
          message: "Email already taken "
        });
      }else {
        bcrypt.hash(password, 10, (err, hash) => {
          if(err){
            res.json({
              success:false,
              message: "Error, cannot encrypt password",
            })
          }else {
            const user = new User({
              firstname: firstname,
              lastname: lastname,
              email: email,
              password: hash
            });
            user.save((err, doc)=>{
              if(err){
                res.json({
                  success:false,
                  message: err,
                });
              } 
              res.json({
                success:true,
                message: "Congratulations, your account has been successfully created ",
                user: doc
              });
            })
          }
        })
      }
    });
    
  } catch (error) {
    res.json({
      success: false,
      msg:error
    })
  }
}

const Signin = async(req, res, next) => {
  try {
    const { email, password } = req.body;
    await User.findOne({email: email}).then((user)=>{
      if(user === null){
        res.json({
          success:false,
          message:"User non exist"
        })
      }else{
        bcrypt.compare(password, user.password).then(function(match) {
          if(match){
            const token = jwt.sign({_id:user._id, firstname:user.firstname, lastname:user.lastname, email:user.email}, process.env.TOKEN_SECRET, {expiresIn: '24h'})
            res.json({
              success:true,
              message:"Welcome",
              user: user,
              token:token
            })
          }else {
            res.json({
              success:false,
              message:"Bad password. try again"
            })
          }
        })
      }
    })
  } catch (error) {
    res.json({
        success: false,
        msg:error
    })
  }
}

const UserData = async (req, res, next) => {
  try {
    const token = req.body.token;
    const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(decoded);
    res.json({
      success:true,
      user:decoded
    })
  } catch (error) {
    res.json({  
      success:false,          
      message:error
    });
  }
}

const Profile = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { lastname, firstname, email } = req.body;

    User.findOneAndUpdate({_id:id}, {$set:{
      firstname:firstname, lastname: lastname, email: email, password: hash
    }}, {new:true}).then((docs) => {
      if(docs) {
        res.json({
          success:true,
          message: "Your profile is now updated",
          user:docs
        })
      } else {
      res.json({
        success:false,
        message: "No such user exists",
      })
      }
    });
  } catch (error) {
    res.json({  
      success:false,          
      message:error
    });
  }
}

const UpdatePass = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { password, newPassword } = req.body;

    await User.findOne({_id: id}).then((user)=>{
      bcrypt.compare(password, user.password).then(function(match) {
        if(match){
          bcrypt.hash(newPassword, 10, (err, hash) => {
            if(err){
              res.json({
                success:false,
                message: "Error, cannot encrypt password",
              })
            }else{
              User.findOneAndUpdate({_id:id}, {$set:{
                password: hash
              }}, {new:true}).then((docs) => {
                if(docs) {
                  res.json({
                    success:true,
                    message: "Password is now updated",
                    user:docs
                  })
               } else {
                res.json({
                  success:false,
                  message: "No such user exists",
                })
               }
              });
            }
          });
        }else {
          res.json({
            success:false,
            message:"Bad password. try again"
          })
        }
      })
    })
  } catch (error) {
    res.json({  
      success:false,          
      message:error
    });
  }
}

module.exports = { Signup, Signin, UserData, Profile, UpdatePass }