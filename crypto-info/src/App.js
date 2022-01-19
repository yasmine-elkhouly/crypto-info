import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import Navbar from './components/Navbar';
import './App.css';
import Homepage from './components/Homepage';
import Cryptocurrencies from './components/Cryptocurrencies';



function App() {


  return (
    
      <div className="app">
      <div className='navbar'>
      <Navbar/>
      </div>
      <div className='main'>
      <Layout>
        <div className="routes">
          <Routes>
            <Route path="/" element={<Homepage />}/>
            <Route path="/cryptocurrencies" element={<Cryptocurrencies/>}/>
           
          </Routes>
      </div>
      </Layout>
      <div className='footer'>
        <Space>
          <Link to="/">Home</Link>
          <Link to="/cryptocurrencies">Cryptocurrencies</Link>
       
          
        </Space>
      </div>
      </div>  
    </div>

  );
}

export default App;
