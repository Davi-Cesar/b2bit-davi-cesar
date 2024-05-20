import { useEffect, useState } from 'react';
import { Profile, Tokens } from '../types/User';
import axios from 'axios';


interface UserTokensProps {
    tokens: Tokens;
    onLogout: () => void;
}

export default function LoggedIn({ tokens, onLogout }: UserTokensProps) {

  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const handleSubmit = async () => {
      try {
          const response = await axios.get('https://api.homologation.cliqdrive.com.br/auth/profile/', {
          headers: {
            'Authorization': `Bearer ${tokens.access}`,
            'Accept': 'application/json;version=v1_web',
            'Content-Type': 'application/json'
          }
          });
          if (response.status === 200) {
            const data = response.data;
            
            setProfile(data);
            localStorage.setItem('accessToken', tokens.access);
            localStorage.setItem('refreshToken', tokens.refresh);
          }
          
      } catch (error) {
        console.error('Erro ao obter dados adicionais do usuário:', error);
      }}
  
      handleSubmit();
    }, [tokens.access, tokens.refresh]);

    const handleLogout = () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      onLogout();
    };

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex justify-end items-center">
        
        <button
          onClick={handleLogout}
          className="bg-primary text-white font-bold py-2 px-24 rounded hover:bg-opacity-90"
        >
          Logout
        </button>
      </header>
      <div className="flex items-center justify-center h-screen w-screen bg-gray-100 pt-16">
        <div className="bg-white p-8 rounded-xl shadow-2xl  w-full max-w-sm text-left">
          <div className="text-center">
            <h1 className="pb-2 font-semibold text-gray-800">Profile picture</h1>
            <img 
              src={profile?.avatar.high} 
              alt="User Avatar" 
              className="w-24 h-24 rounded-md object-cover mx-auto mb-4" 
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block capitalize text-gray-700 font-semibold mb-2">your <span className="font-bold">name</span></label>
            <input
              type="name"
              id="name"
              name="name"      
              className="w-full px-3 py-2 border border-gray-300 bg-gray-300 rounded-md focus:outline-none focus:border-transparent" 
              value={profile?.name}
              disabled

           />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block capitalize text-gray-700 font-semibold mb-2">your <span className="font-bold">E-mail</span></label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 bg-gray-300 rounded-md focus:outline-none focus:border-transparent"
              value={profile?.email}
              disabled
            />
          </div>
          
        </div>
      </div>
    </>
  );
}
