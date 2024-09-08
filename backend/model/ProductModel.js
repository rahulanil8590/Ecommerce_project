import mongoose from 'mongoose'; // Erase if already required

// Declare the Schema of the Mongo model
var ProductSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim : true
       
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase: true
    },
   description:{
        type:String,
        required:true,
    },
    price:{
        type: Number,
        required:true,
    },
    brand:{
        type: String,
        required:true,
    },
   category:{
        type: String,
        required:true,
    },
    sold:{
        type: Number,
       
    },
    quantity:{
        type: Number,
        required:true,
    },
    images:[{
        public_id: String,
        url : String,
    }],
    color : ['Black' , 'blue' , 'red'],
    tags : String,
    ratings: [
        {
          star: Number,
          comment: String,
          postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        },
      ],
      totalrating: {
        type: String,
        default: 0,
      },
} , {timestamps : true});

//Export the model
const ProductModel = mongoose.model('Product', ProductSchema);
export default ProductModel