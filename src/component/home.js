import ProductList from "./productList";
import Slider from "./slider";
import { useState,useEffect } from "react";
import axios from 'axios';
const Home=()=>{
    const [products,setProduct]= useState([]);
    const [error, setError] = useState(null);
    useEffect(()=>{
        const fetchProduct=async()=>{
try{
const res= await axios.get('http://localhost:3000/api/products');
setProduct(res.data);
setError(null);
}
catch(error){
    console.error("Failed to fetch products:", error);
    setError("Failed to load products. Please try again later.");
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