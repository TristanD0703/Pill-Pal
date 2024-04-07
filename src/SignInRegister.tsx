import React, { useState } from 'react';
import { createAccount, loginEmail, loginGoogle } from './Database'; // Assuming these functions are correctly set up
import { redirect, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"

const SignInRegister = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true); // To toggle between login and register
    
    const navigate = useNavigate();
    const handleRegister = async () => {
        try{
            await createAccount(email, password);
            navigate('/setup')
        }catch(err){
            console.log(err);
        }
        // Add your logic for handling registration success or error
        
    };

    const handleSignIn = async () => {
        try{
            await loginEmail(email, password);
            navigate('/setup')
        }catch(err){
            console.log(err);
        }
        // Add your logic for handling login success or error
       
    };
    const handleGoogleSignIn = async () => {
        try{
            await loginGoogle(); 
            navigate('/setup')
        }catch(err){
            console.log(err);
        }
        // Add logic for handling Google sign in success or error
        
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4 flex justify-between">
                    <button
                        className={`w-1/2 py-2 ${isLogin ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} rounded-tl-md rounded-bl-md focus:outline-none focus:shadow-outline`}
                        onClick={() => setIsLogin(true)}
                    >
                        Sign In
                    </button>
                    <button
                        className={`w-1/2 py-2 ${isLogin ? 'bg-white text-gray-700' : 'bg-blue-500 text-white'} rounded-tr-md rounded-br-md focus:outline-none focus:shadow-outline`}
                        onClick={() => setIsLogin(false)}
                    >
                        Register
                    </button>
                </div>
                
                <form onSubmit={isLogin ? handleSignIn : handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <button
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            {isLogin ? 'Sign In' : 'Register'}
                        </button>
                    </div>
                </form>
                
                <div className="mt-4">
                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Sign In with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignInRegister;