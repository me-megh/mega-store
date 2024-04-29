import { useState,useEffect } from "react";
const FashionCard =()=>{
    const [data,setData]=useState(null);
useEffect(()=>{
    console.log("-----------------------")
    async function fetchData(){
        try{
            const res= await fetch('https://dummyjson.com/products');
        let  result=  await res.json();
        setData(result)
            console.log(result)
        }catch (error) {
            console.error('Error fetching data:', error);
          }
    }
    fetchData();
},[])
console.log(data,"------")
    return(<>
    {data?.products.map((items)=>{
        return(<>
    <div className="res-card">
    <img className="res-logo" alt="res-logo" src={items.images[0]}/>
    <div className="res-desc">
       <strong>{items.brand}</strong><br/>
       {items.title}<br/>
       {items.price}$<br/>
    </div>
    </div>
    </>)
    })}
    
    
    </>)
}
export default FashionCard;