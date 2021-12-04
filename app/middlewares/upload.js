const multer = require("multer");

const jpegFilter = (req, file, cb) => {
  // Set the filetypes, it is optional
  var filetypes = /jpeg|jpg|png/;
  var mimetype = filetypes.test(file.mimetype);

  
  if (mimetype) {
      return cb(null, true);
  }

  cb("Error: File upload only supports the "
          + "following filetypes - " + filetypes);

};

// var upload = multer({ dest: "Upload_folder_name" })
// If you do not want to use diskStorage then uncomment it
    
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
  
        // Uploads is the Upload_folder_name
        cb(null,  "uploads")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
  })
       
// Define the maximum size for uploading
// picture i.e. 1 MB. it is optional
const maxSize = 1 * 1000 * 1000;

var uploadFile = multer({ storage: storage, fileFilter: jpegFilter, limits: { fileSize: maxSize } });
module.exports = uploadFile;