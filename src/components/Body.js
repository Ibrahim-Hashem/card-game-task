import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./style/Body.css";

function Body() {
    const [deck,setDeck] = useState("");
    const [prevC, setPrevC] = useState({
        image: '',
        suit: '',
        value: '',
        remaining:52
    });
    const [newC, setNewC] = useState({
        image: '',
        suit: '',
        value: '',
        remaining: 52
    }); 
    const [value, setValue] = useState(-1);
    const [suit,setSuit] = useState(-1);
    useEffect(()=>{
        axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
        `).then(res =>{
            setDeck(res.data.deck_id);
        })
    },[]);

    function getCard(){
        setPrevC(newC)
        axios.get(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1
        `).then(res=>{
            setNewC({
                image: res.data.cards[0].images.png,
                suit: res.data.cards[0].suit,
                value: res.data.cards[0].value,
                remaining: res.data.remaining
            });
            if(prevC.value === newC.value){
                setValue(value + 1);
            }
            if(prevC.suit === newC.suit){
                setSuit(suit + 1);
            }
        } ).catch(()=>{
            setNewC({
                image: '',
                suit: '',
                value: '',
                remaining: 52
            });
        })
    }

    function Button(){
        if(newC.remaining !== 0){
            return(
                <div className="body__btn__main">
                    <button  onClick = {getCard} className="body__btn">Draw card</button>
                </div>
            )
        }else{
            return( 
                <div className="Body__counts">
                    <div className="body__value"><h3>VALUE MATCHES:{value === -1? 0 : value}</h3></div>
                    <div className="body__suit"><h3>SUIT MATCHES:{suit === -1? 0: suit}</h3></div>
                 </div>
            )
        }
    }

    
    return (
        <div>
            <div className="body__main">
                <div className="body__alert">
                    <h2>{prevC.suit === newC.suit && suit !== -1 ? "SNAP SUIT!": ""}</h2>
                    <h2>{prevC.value === newC.value && value !== -1? "SNAP VALUE!": ""}</h2>
                </div>
                <div><h3>{newC.remaining} cards remaining</h3></div>
                <div className="body__cards">
                    <div className="body__card"><img src={prevC.image} alt=""/></div>
                    <div className="body__card"><img src={newC.image} alt=""/></div> 
                </div>
            </div>
            <Button />
        </div>
    )
}

export default Body
