import React from 'react';
import millify from 'millify';
import {Typography, Row, Col, Statistic, Card} from 'antd';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';



function Homepage() {
    
    const [totalCoins,settotalCoins] = useState(0);
    const [totalExchanges,settotalExchanges] = useState(0);
    const [totalMarketCap,settotalMarketCap] = useState(0);
    const [totalMarkets,settotalMarkets] = useState(0);
    const [coins,setCoins] = useState([]);
    var count = 10;

    const head = {
        'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
        'key cannot be published'
    }

    async function getInformation(){

    const response =  await axios.get('https://coinranking1.p.rapidapi.com/coins',{
        method:'get',
        headers:head})
    
    settotalCoins(response.data.data.stats.totalCoins)
    settotalExchanges(response.data.data.stats.totalExchanges)
    settotalMarketCap(response.data.data.stats.totalMarketCap)
    settotalMarkets(response.data.data.stats.totalMarkets)
    
    }

    getInformation();

    async function getCoinInformation(){

    const response =  await axios.get('https://coinranking1.p.rapidapi.com/coins',{
        method:'get',
        headers:head})
        for (var coin in response.data.data.coins){
            if (count > 0){
            setCoins((prev)=>[...prev,(((response.data.data.coins)[coin]))])};
            count--;
        }

    }
    
    useEffect(()=>{
        getCoinInformation()
    },[])

    

    

    return (
        <>
            <Typography.Title level={2} className='Heading'>Global Crypt Statistics</Typography.Title>
            <Row>
                <Col span={12}>
                    <Statistic title="Total Cryptocurrencies" value={totalCoins}/>
                </Col>
                <Col span={12}>
                    <Statistic title="Total Exchanges" value={millify(totalExchanges)}/>
                </Col>
                <Col span={12}>
                    <Statistic title="Total Market Cap" value={millify(totalMarketCap)}/>
                </Col>
                <Col span={12}>
                    <Statistic title="Total Markets" value={millify(totalMarkets)}/>
                </Col>
            </Row>
             <div className='home-heading-container'>
                <Typography.Title level={2} className='home-title'>Current Top 10 Cryptocurrencies</Typography.Title>
                <Typography.Title level={3} className='show-more'><Link to="/cryptocurrencies">Show More</Link></Typography.Title>
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

export default Homepage;
