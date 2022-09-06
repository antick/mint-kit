import * as path from 'path';
import * as multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, '../../../public/uploads/'));
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`);
  }
});

const uploadMiddleware = multer({
  storage,
  limits: {
    fileSize: 4 * 1024 * 1024 // 4 MB
  }
});

export default uploadMiddleware;
