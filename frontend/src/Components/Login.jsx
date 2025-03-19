import React, { useState } from 'react';
import Header from './Header';
import axios from 'axios';
import { API_END_POINT } from '../utils/constant';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getInputData = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!email || !password || (!isLogin && !fullName)) {
            setError('All fields are required!');
            setLoading(false);
            return;
        }

        const user = isLogin ? { email, password } : { fullname: fullName, email, password };

        try {
            const res = await axios.post(
                `${API_END_POINT}/${isLogin ? 'login' : 'register'}`,
                user,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                }
            );

            if (res.data.success) {
                toast.success(res.data.message);

                if (isLogin) {
                    dispatch(setUser(res.data.user));

                    navigate('/browse');
                } else {
                    setIsLogin(true);
                }
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Something went wrong';
            toast.error(errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(false);
            setEmail('');
            setFullName('');
            setPassword('');
        }
    };

    return (
        <div className="relative min-h-screen">
            <Header />
            <div className="absolute inset-0">
                <img
                    className="w-full h-full object-cover"
                    src="https://miro.medium.com/v2/resize:fit:4800/format:webp/1*5lyavS59mazOFnb55Z6znQ.png"
                    alt="background"
                />
            </div>
            <div className="relative flex justify-center items-center min-h-screen py-10 px-4">
                <form
                    onSubmit={getInputData}
                    className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-black bg-opacity-90 rounded-md p-6 sm:p-8 md:p-12"
                >
                    <h1 className="text-white text-2xl sm:text-3xl mb-4 sm:mb-6 font-bold text-center">
                        {isLogin ? 'Login' : 'SignUp'}
                    </h1>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    <div className="flex flex-col w-full">
                        {!isLogin && (
                            <input
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                type="text"
                                placeholder="Full Name"
                                className="outline-none p-3 mt-2 rounded-md bg-gray-800 text-white w-full"
                            />
                        )}
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Email"
                            className="outline-none p-3 mt-2 rounded-md bg-gray-800 text-white w-full"
                        />
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                            className="outline-none p-3 mt-2 rounded-md bg-gray-800 text-white w-full"
                        />
                        <button
                            type="submit"
                            className={`bg-red-600 hover:bg-red-700 text-white py-3 mt-4 rounded-md font-bold transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : isLogin ? 'Login' : 'SignUp'}
                        </button>
                        <p className="text-white text-center mt-4">
                            {isLogin ? 'New to Netflix?' : 'Already have an account?'}{' '}
                            <span
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-red-600 cursor-pointer hover:underline"
                            >
                                {isLogin ? 'SignUp' : 'Login'}
                            </span>
                        </p>
                    </div>
                </form>
            </div>
            <Toaster position="top-center" />
        </div>
    );
};

export default Login;
