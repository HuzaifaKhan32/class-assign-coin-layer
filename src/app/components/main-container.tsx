"use client"
import { useEffect, useState } from "react";
import BTC from "../../../public/btc.png"
import ETH from "../../../public/Etherium.png"
import SNT from "../../../public/snt.png"
import XRP from "../../../public/XRP.png"
import BNB from "../../../public/BNB.png"
import ADA from "../../../public/cardano-ada-logo.png"
import SOL from "../../../public/solana.png"
import LTC from "../../../public/LTC.png"
import BLZ from "../../../public/bluzelle-blz-logo.png"
import EOS from "../../../public/EOS.png"
import { StaticImageData } from "next/image";
import Image  from "next/image";

const APIKey = "9b53065ed3fc6ce7498be0eacc58b963";

const Main = () => {
    const [data, setData] = useState<any>(null);
    const coinImages : {[key : string] : StaticImageData} = {
        BTC: BTC,
        ETH: ETH,
        ADA: ADA,
        SOL: SOL,
        LTC: LTC,
        BLZ: BLZ,
        XRP: XRP,
        EOS: EOS,
        BNB: BNB,
        SNT: SNT

    } 
    const selectedCoins : string[] = ["BNB", "BTC", "ETH", "SOL", "ADA", "LTC", "BLZ", "XRP", "SUI", "SNT", "EOS"];

    useEffect(() => {
        fetch(`https://api.coinlayer.com/api/live?access_key=${APIKey}`)
            .then((response) => response.json())
            .then((convertedData) => {
                const filteredData = {
                    ...convertedData,
                    rates: Object.keys(convertedData.rates)
                        .filter((key) => selectedCoins.includes(key))
                        .reduce((obj : any, key) => {
                            obj[key] = convertedData.rates[key];
                            return obj;
                    
                        }, {})
                };
                setData(filteredData);
                console.log(filteredData);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div className="main-container">
            <h1 className="main-heading">Today&apos;s <span style={{color : "#F0B90B"}}>Cryptocurrency</span> rates</h1>
            <div className="coin-table">
                <div className="left">
                    <h1>Coin</h1>
                    
                    {data && Object.keys(data.rates).map((coin, index) => (
                        
                        <div key={index} className="coins">
                            {coinImages[coin] && (
                                <Image src={coinImages[coin]} width={20} height={20} alt={coin} className="coin-img"/>
                            )}
                            {coin}</div>
                    ))}
                </div>
                <div className="right">
                    <h1>Amount</h1>
                    {data && Object.values(data.rates).map((amount : any, index) => (
                        <div key={index} className="amount">{amount}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Main;
