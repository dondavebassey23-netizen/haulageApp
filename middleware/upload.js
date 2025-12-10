import multer from "multer";

export const upload = multer({ dest: 'uploads/' });

export default upload;