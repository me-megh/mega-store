import ProductList from "./productList";
import Slider from "./slider";
import { useState,useEffect } from "react";
import axios from 'axios';
const Home=()=>{
    const [products,setProduct]= useState([])
    useEffect(()=>{
        const fetchProduct=async()=>{
try{
const res= await axios.get('http://localhost:3000/api/products');
setProduct(res.data)
}
catch(error){
    console.error("Failed to fetch products:", error);
}
        }
        fetchProduct();
    },[])
    return(<>
    
    <Slider/>
    <ProductList products={products}/>
    </>)
}
export default Home;