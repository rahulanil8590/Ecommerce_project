import cloudinary from 'cloudinary'



cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLODINARY_API,
        api_secret: process.env.CLODINARY_SECRET,
})

 export const CloudinaryImg = async (fileupload) =>{
   return new Promise(resolve =>{
        cloudinary.uploader.upload(fileupload , (result) =>{
            resolve(
                {
                  url: result.secure_url,
                  asset_id: result.asset_id,
                  public_id: result.public_id,
                },
                {
                  resource_type: "auto",
                }
              );
        })
   })
}

export const Cloudinarydelete = async (fileupload) =>{
    return new Promise(resolve =>{
         cloudinary.uploader.destroy(fileupload , (result) =>{
             resolve(
                 {
                   url: result.secure_url,
                   asset_id: result.asset_id,
                   public_id: result.public_id,
                 },
                 {
                   resource_type: "auto",
                 }
               );
         })
    })
 }