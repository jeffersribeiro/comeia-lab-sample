import Multer from "multer";

export default Multer({
  storage: Multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024000 },
});
