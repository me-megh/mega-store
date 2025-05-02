import dbConnect from '../../../lib/db';
import Product from '../../../models/product';
export default async function handler(req,res){
    await dbConnect();
    if(req.method === 'POST'){
        try{
        const product=await Product.create(req.body);
res.status(201).json({success:true,product})
        }catch(err){
res.status(400).json({success:false,message:err.message})
        }
    }else{
        res.status(405).json({msg:'method not allowd'})
    }
}