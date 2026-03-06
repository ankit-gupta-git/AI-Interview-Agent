import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function(req, file, cb) { //callback function
        cb(null, "public"); //folder name
    },
    filename: function(req, file, cb) {
        const filename = Date.now() + "-" + file.originalname;
        cb(null, filename);
    },
});

const upload = multer({ storage, limits: { fileSize: 5000000 } }); //5MB limit

export default upload;