"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminRegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, action: 'register' }),
    });

    const data = await res.json();

    if (data.success) {
      setMessage('Registration successful! Redirecting to login...');
      setTimeout(() => {
        router.push('/admin/login'); // Redirect to login page after registration
      }, 2000); // Wait for 2 seconds before redirecting
    } else {
      setMessage(data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-6 space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700"
      >
        Register Admin
      </button>

      {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
    </form>
  );
};

export default AdminRegisterForm;
