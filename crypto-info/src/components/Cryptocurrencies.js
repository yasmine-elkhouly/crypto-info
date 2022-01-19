import React from 'react'
import {useState,useEffect} from 'react';
import axios from 'axios';
import { Card, Row, Col, Input } from 'antd';
import millify from 'millify';
import { Link } from 'react-router-dom';

function Cryptocurrencies() {

    const [coins,setCoins] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const head = {
        'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
        'key cannot be published'
    }

    async function getInformation(){

    const response =  await axios.get('https://coinranking1.p.rapidapi.com/coins',{
        method:'get',
        headers:head})
        for (var coin in response.data.data.coins){
        setCoins((prev)=>[...prev,(((response.data.data.coins)[coin]))])
        }

    }
    
    useEffect(()=>{
        getInformation()
    },[])

    useEffect(()=>{
        console.log(searchTerm)
        const filteredData = coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
        console.log(filteredData);
        setCoins(filteredData);
        console.log(coins);
    },[searchTerm])

    return (
        <>
        <div className='search-crypto'>
            <Input placeholder='Search Cryptocurrency' onChange={(e => setSearchTerm(e.target.value))}/>
        </div>
            <Row gutter={[32,32]} className='crypto-card-ontainer'>
                   {coins.map(coin=>(
                        <Col xs={24} sm={12} lg={6} className='crypto-card' key={coin.uuid}>
                            <Link to={`/crypto/${coin.uuid}`}>
                                <Card title={`${coin.rank}. ${coin.name}`} extra={<img className='crypto-image' src={coin.iconUrl}/>} hoverable>
                                    <p>Price: {millify(coin.price)}</p>
                                    <p>Market Cap: {millify(coin.marketCap)}</p>
                                    <p>Daily Change: {millify(coin.change)}</p>
                                </Card>
                            </Link>
                        </Col>
                   ))}
            </Row>
        </>
    )
}

export default Cryptocurrencies
