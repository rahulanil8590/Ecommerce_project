import mongoose from 'mongoose'; // Erase if already required

// Declare the Schema of the Mongo model
var BrandSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    
});

//Export the model
 const BrandModel = mongoose.model('Brand', BrandSchema);
 export default BrandModel
