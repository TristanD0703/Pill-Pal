import React, { useState } from 'react';
import { setNewUserData } from './Database';
import { getAuth } from 'firebase/auth';
import { useNavigate } from "react-router-dom"
const SetUpAccount = () => {
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try{
            await setNewUserData(name, dateOfBirth, getAuth().currentUser?.uid);
            navigate('/home')
        }catch(err){
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div>
                        <label htmlFor="dateOfBirth" className="block text-gray-700 text-sm font-bold mb-2">
                            Date of Birth:
                        </label>
                        <input
                            type="date"
                            id="dateOfBirth"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SetUpAccount;