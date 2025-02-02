import multer from 'multer'
// import sharp from 'sharp'
import path from 'path'
const _dirname = path.resolve(path.dirname(""))
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(_dirname, "../public/image/"));
  },
  filename: function (req, file, cb) {
    const uniquesuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    console.log(file.fieldname);
    
    cb(null, file.fieldname + "-" + uniquesuffix + ".jpeg");
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};

 export const uploadPhoto = multer({
  storage: storage,
  fileFilter: multerFilter,
  limits: { fileSize: 1000000 },
});

//  export const productImgResize = async (req, res, next) => {
//     if (!req.files) return next();
//     await Promise.all(
//       req.files.map(async (file) => {
//         await sharp(file.path)
//           .resize(300, 300)
//           .toFormat("jpeg")
//           .jpeg({ quality: 90 })
//           .toFile(`public/images/products/${file.filename}`);
//         fs.unlinkSync(`public/images/products/${file.filename}`);
//       })
//     );
//     next();
//   };
  
//  export const blogImgResize = async (req, res, next) => {
//   //   if (!req.files) return next();
//   //   await Promise.all(
//   //     req.files.map(async (file) => {
//   //       await sharp(file.path)
//   //         .resize(300, 300)
//   //         .toFormat("jpeg")
//   //         .jpeg({ quality: 90 })
//   //         .toFile(`public/images/blogs/${file.filename}`);
//   //       fs.unlinkSync(`public/images/blogs/${file.filename}`);
//   //     })
//   //   );
//   //   next();
//   // }  