/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
import multer from "multer";

const memoryStorage = multer.memoryStorage({
  destination(req, file, cb) {
    cb(null, `${__dirname}/upload`);
  },
  filename(req, file, cb) {
    const datetimestamp = Date.now();
    cb(null, file.fieldname + "-" + datetimestamp + "." + file.originalname.split(".")[file.originalname.split(".").length - 1]);
  },
});

// Reserved For Disk Storage
// eslint-disable-next-line no-unused-vars
const diskStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, __dirname);
  },
  filename(req, file, cb) {
    const datetimestamp = Date.now();
    cb(null, file.fieldname + "-" + datetimestamp + "." + file.originalname.split(".")[file.originalname.split(".").length - 1]);
  },
});

const uploader = multer({
  storage: memoryStorage,
  fileFilter(req, file, callback) {
    if (["xlsx"].indexOf(file.originalname.split(".")[file.originalname.split(".").length - 1]) === -1) {
      return callback(new Error("Wrong extension type"));
    }
    callback(null, true);
  },
});

export default uploader;
