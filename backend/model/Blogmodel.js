import  mongoose from 'mongoose'; // Erase if already required

// Declare the Schema of the Mongo model
var BlogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
       
    },
    description:{
        type:String,
        required:true,
        
    },
    category:{
        type:String,
        required:true,
      
    },
  numView:{
        type: Number,
       default : 0
    },
    isliked :{
        type : Boolean,
        default : false
    },
    unliked :{
        type : Boolean,
        default : false
    },
    likes : [{
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'User'
    }],
    Unlikes : [{
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'User'
    }],
    image :[],
    author :{
        type : String,
        default : 'Admin'
    }

},{
    toJSON :{
        virtuals : true
    },
    toObject :{
        virtuals : true
    },
    timestamps : true
});

//Export the model
const BlogModel = mongoose.model('Blog', BlogSchema);

export default BlogModel