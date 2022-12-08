const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
let aws = require('aws-sdk')

aws.config.update({accessKeyId: "AKIAUYOEP5OLEHW6ZUMN", secretAccessKey: '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'})
var s3bucket = new aws.S3({ params: { Bucket: "ga-chatterbox"}})
const base_URL = "https://ga-chatterbox.s3.ca-central-1.amazonaws.com"

async function create(req, res) {
  try {
    const user = await User.create(req.body);
    const token = createJWT(user);
    res.json(token);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    // timer for when user automatically logs out
    const token = createJWT(user);
    res.json(token);
  } catch (error) {
    res.status(400).json("Bad Credentials");
  }
}


async function updateUser(req,res) {
  try {   
    const user = await User.findOne({ email: req.body.email });
    user.firstname = req.body.firstname
    user.lastname = req.body.lastname
    user.username = req.body.username
    user.about = req.body.about
    user.save()
    if (!user) throw new Error();   
    res.status(200).json(user)
  } catch (error) {
    return res.status(400).json(error);
  }
}

async function uploadPicture(req,res) {
  const user = await User.findOne({ email: req.params.email });
  user.profilePicture = `${base_URL}/${req.files.file.name}`
  user.save()
if (req.files.file) 
    console.log (`uploading image ${req.files.file.name} start. `)
    try {   
      let response = await uploadFileOnS3(req.files.file.name, req.files.file)
      console.log (response)
      // res.status(200).json(response)
      res.status(200).json(user)
    }    
    catch(error) {
      return res.status(400).json(error); 
    }
}

function uploadFileOnS3(fileName, fileData) {
  var params = {
    Key: fileName,
    Body: fileData.data,
  };
  s3bucket.upload(params, function (err, res) {
    if (err) {
      console.log("Error in uploading file on s3 due to " + err);
    } else {
      console.log(res);
      console.log("File successfully uploaded.");
    }
  });
}

function checkToken(req, res) {
  console.log("req.user -->", req.user);
  res.json(req.exp);
}

//getUser
async function getUser (req, res){ 
  try {
    const result = await User.findById(req.params.userId)
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json(error)
  }
}

//getAllUsers
async function getAllUsers (req, res){ 
  try {
    const result = await User.find({})
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json(error)
    
  }
}

//Helper Functions

function createJWT(user) {
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
}

module.exports = {
  create,
  login,
  update: updateUser,
  uploadPicture,
  checkToken,
  getUser,
  getAllUsers,
};
