'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, action: 'login' }),
    });

    if (res.ok) {
      localStorage.setItem("userEmail", email); // Store email in local storage
      router.push('/');
    } else {
      const data = await res.json();
      setError(data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8  shadow-md rounded-lg border space-y-6">
  <h2 className="text-2xl font-bold text-center">Login</h2>
  {error && <p className="text-red-500 text-sm text-center">{error}</p>}
  
  <div className="relative">
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      className="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
    />
    <span className="absolute inset-y-0 right-4 flex items-center">
      ✉️
    </span>
  </div>
  
  <div className="relative">
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      className="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
    />
    <span className="absolute inset-y-0 right-4 flex items-center">
      🔒
    </span>
  </div>
  
  <button
    type="submit"
    className="w-full bg-blue-500 py-3 rounded-lg text-sm font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300">
    Login
  </button>
  
  <p className="text-sm text-center text-gray-500">
    Don't have an account? 
    <Link href="/register" className="text-blue-500 hover:underline"> Sign up</Link>
  </p>
</form>

  );
}
