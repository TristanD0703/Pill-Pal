import logo from './logo.svg';
import './App.css';
import React from 'react';

function App() {
  return (
    <>
  <div className="page">
    <div className="input-area">
        <div className="wrapper">
            <div className="card-switch">
                <label className="switch">
                    <input type="checkbox" className="toggle"/>
                    <span className="slider"></span>
                    <span className="card-side"></span>

                    <div className="flip-card__inner">
                        <div className="flip-card__front">
                            <div className="title">Log in</div>
                            <form className="flip-card__form" action="">
                                <input className="flip-card__input" name="email" placeholder="Email" type="email" required/>
                                <input className="flip-card__input" name="password" placeholder="Password" type="password" required/>
                                <div className="g-signin2"/>
                                    <a  href="https://accounts.google.com/o/oauth2/auth?
                                    client_id=YOUR_CLIENT_ID&
                                    redirect_uri=YOUR_REDIRECT_URI&
                                    response_type=code&
                                    scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile&
                                    access_type=offline">
                                    <img className="google-image" src="images/googleicon.png"/>
                                    </a>
                                <div/>

                                <button className="flip-card__btn">Enter</button>
                                
                            </form>
                        </div>
                        <div className="flip-card__back">
                            <div className="title">Sign up</div>
                                <form className="flip-card__form" action="">
                                    
                                    <input className="flip-card__input" name="email" placeholder="Email" type="email" required/>
                                    <input className="flip-card__input" name="password" placeholder="Password" type="password" required/>
                                    <div className="g-signin2">
                                        <a  href="https://accounts.google.com/o/oauth2/auth?
                                        client_id=YOUR_CLIENT_ID&
                                        redirect_uri=YOUR_REDIRECT_URI&
                                        response_type=code&
                                        scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile&
                                        access_type=offline">
                                        <img className="google-image" src="googleicon.png"/>
                                        </a>


                                    <div/>
                                    
                                    <button className="flip-card__btn">Confirm</button>
                                </form>
                        <div/>

                        
                                    
                                
                    
                        <div/>



                    </div>
                <label/>
                
            </div>   
        </div> 
    </div>
    
<div/>

<div className="label2">
    <label>Property of Twinkle Toes</label>
</div>
</>
  );
};


export default App;