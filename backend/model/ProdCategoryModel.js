import mongoose from 'mongoose';; // Erase if already required

// Declare the Schema of the Mongo model
var ProdcategorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    
});

//Export the model
 const prodCategory = mongoose.model('prodcategory', ProdcategorySchema);
 export default prodCategory
