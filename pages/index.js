import Home from '../src/component/home';
import Header from '../src/component/header';
import Footer from '../src/component/footer';
import React,{useState} from 'react';
import Login from '../src/component/login';
import Signup from '../src/component/signup';
const Index = () => {
  return (
  <div className="App"> 
  <Header />
  <Home />
  <Footer />
</div>
);
};

export default Index;
