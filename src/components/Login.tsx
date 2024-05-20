import axios from 'axios';
import React, { useState } from 'react';
import { Tokens } from '../types/User';

interface LoginProps {
    onLogin: (tokens: Tokens) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorLogin, setErrorLogin] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(email)) {
      try {
        const response = await axios.post('https://api.homologation.cliqdrive.com.br/auth/login/', {
          email,
          password
        },
        {
          headers: {
            'Accept': 'application/json;version=v1_web',
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 200) {
          const { tokens } = response.data;
          onLogin(tokens);
        }
      } catch (error: any) {
        setErrorLogin(error?.response?.data?.detail || 'Erro ao tentar fazer login.');
      }
    } else {
      setIsValidEmail(false);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-white">
      <div className="bg-white p-8 rounded-xl shadow-2xl shadow-zinc-400 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-950">
          <img src="/B2Bit.png" alt="Logo" className="mx-auto object-contain mb-4 h-30 w-72" />
        </h2>
        
        <form onSubmit={handleSubmit}>
          {errorLogin && <p className="text-primary bg-secundary p-2 rounded-md text-center mb-4">{errorLogin}</p>}
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className={`w-full px-3 py-2 border ${isValidEmail ? 'border-gray-300' : 'border-red-500'} bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent`}
              onChange={(e) => {
                setEmail(e.target.value);
                setIsValidEmail(true);
              }}
              placeholder="@gmail.com"
            />
            {!isValidEmail && <p className="text-red-500 text-sm px-2 rounded-md text-left mb-4">Please, insert valid email.</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              required
              className={`w-full px-3 py-2 border ${isValidPassword ? 'border-gray-300' : 'border-red-500'} bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent`}
              onChange={(e) => {
                setPassword(e.target.value);
                setIsValidPassword(true);
              }}
              placeholder="**********"
            />
          </div>
          {!isValidPassword && <p className="text-red-500 text-sm px-2 rounded-md text-left mb-4">Please, insert valid password.</p>}
          <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-2 px-4 rounded"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
