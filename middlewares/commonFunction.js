const multer = require('multer')
var cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: "dbrvq9uxa",
  api_key: "567113285751718",
  api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4",
});
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
      const fileExt = file.originalname.split(".").pop();
      const filename = `${new Date().getTime()}.${fileExt}`;
      cb(null, filename);
  },
});

// Filter the file to validate if it meets the required audio extension
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "audio/mp3" || file.mimetype === "audio/mpeg") {
      cb(null, true);
  } else {
      cb(
          {
              message: "Unsupported File Format",
          },
          false
      );
  }
};
module.exports = {
   uploadProfileImage(profilePic) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(profilePic, function (error, result) {
        if (error) {
          reject(error);
        }
        else {
          resolve(result.secure_url)
        }
      });
    })
  },
}