// components/RegisterForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Button } from './ui/button';


export default function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, action: 'register' }),
        });

        const data = await res.json();
        if (res.ok) {
            router.push('/login');
        } else {
            setError(data.error || 'Registration failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 shadow-md rounded-lg border space-y-6">
            <h2 className="text-2xl font-bold text-center">Register</h2>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <div className="relative">
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    
                />
            </div>
            <div className="relative">
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  
                />
            </div>
            <Button
                type="submit"
                
            >
                Register
            </Button>
            <p className="text-sm text-center ">
                Already have an account?{' '}
                <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
            </p>
        </form>
    );
}
