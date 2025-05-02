import mongoose from 'mongoose';
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
      },
      description:{
        type:String,
        required:[true,"product description is required"]
      },
      price:{
        type:Number,
        required:[true,'product price is required']
      },
      category:{
        type:String,
        enum:['men','women'],
        required:true
      },
      images:{
        type: [String],
        validate:[arr=>arr.length>0]
      },
      sizes:{
        type:[String],
        enum:['S','M','L'],
        default: ['S'],
      },
      inStock:{
        type:Number,
        required:true,
        min:[0,'stock can not be negative']
      },
      tags:{
        type:[String],
        default:[]
      },
      featured: {
        type: Boolean,
        default: false
      },
      rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
      },
      color: {
        type: String,
        required: [true, 'Color is required'],
      },
    },
      {
        timestamps: true
      
})
export default mongoose.models.Product || mongoose.model('Product', ProductSchema);