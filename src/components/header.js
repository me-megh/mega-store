import React from 'react';
import SmartPhone from './smartPhones';

const Header = () => {
   
    return (<>

        <div className="header">
            <div className='logo-container'>
                <img className="logo" src='https://t4.ftcdn.net/jpg/04/29/34/73/240_F_429347385_1sHIAncOz3qqmqe2JN9FWKsRABliseLj.jpg' />
            </div>
            <div className='nav-items'>
                <ul>
                    <li>Home</li>
                    <li>SmartPhones</li>
                    <li>Laptop</li>
                    <li>Skin Care</li>
                    <li>Groceries</li>
                    <li>Home Decor</li>
                    <li>Cart</li>
                </ul>
            </div>
        </div>
    </>)
}
export default Header;