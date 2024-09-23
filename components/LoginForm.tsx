'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, action: 'login' }),
            });

            if (res.ok) {
                router.push('/');
                setTimeout(() => {
                    localStorage.setItem('userEmail', email);  // Ensure this doesn't block navigation
                }, 1000);
            } else {
                const data = await res.json();
                setError(data.error);
            }
        } catch {
            setError('Network error. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 shadow-md rounded-lg border space-y-6">
            <h2 className="text-2xl font-bold text-center">Login</h2>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <div className="relative">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="relative">
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button
                type="submit"
                className={`w-full py-3 rounded-lg text-sm font-semibold focus:outline-none transition duration-300 ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'}`}
                disabled={loading}
            >
                {loading ? 'Logging in...' : 'Login'}
            </button>
            <p className="text-sm text-center text-gray-500">
                Don't have an account?{' '}
                <Link href="/register" className="text-blue-500 hover:underline">Sign up</Link>
            </p>
        </form>
    );
}
