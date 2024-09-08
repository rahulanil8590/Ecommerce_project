import mongoose, { Schema } from "mongoose"; // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
       
    },
    lastname:{
        type:String,
        required:true,
       
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
   role:{
        type: String,
        default : 'users'
    },
    isBlock :{
        type : Boolean,
        default : false
    },
    cart :{
        type : Array,
        default: []
    },
    refreshToken :{
        type : String
    },
    address : [{type : Schema.Types.ObjectId , ref : 'Address'}],
    wishlist : [{type : Schema.Types.ObjectId , ref : 'Product'}],
    verified: {type : Boolean , default : false}
  
},
   {timestamps : true} );

//Export the model
 const User = mongoose.model('User', userSchema);
 export default User