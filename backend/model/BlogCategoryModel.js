import mongoose from 'mongoose'; // Erase if already required

// Declare the Schema of the Mongo model
var BlogcategorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    
});

//Export the model
 const BlogCategory = mongoose.model('Bcategory', BlogcategorySchema);
 export default BlogCategory
