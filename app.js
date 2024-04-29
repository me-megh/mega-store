import React from 'react';
import Header from './src/components/header';
import Footer from './src/components/footer';
import FashionCard from './src/components/fashionCard';

const App = () => {
    return (< >
    <div className='app'>
        <Header />
        <Home />
        <Footer />
        </div>
    </>)
}
export const Home = () => {
    return (<>
        <div className="body">
            <div class="search-container">
                <input type="text" placeholder="Search..." />
            </div>

            <div className="res-container">
                <FashionCard />
            </div>
        </div>
    </>)
}

export default App;