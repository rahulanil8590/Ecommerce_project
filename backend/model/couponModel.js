import mongoose from 'mongoose' // Erase if already required

// Declare the Schema of the Mongo model
var couponSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        uppercase :true
    },
   expire:{
        type:String,
        required:true,
    },
    discount:{
        type:String,
        required:true,    
    },
   
});

//Export the model
const Coupon = mongoose.model('coupon', couponSchema);
export default Coupon