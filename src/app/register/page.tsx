'use client';

import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeFirebase } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';


const sdks = initializeFirebase();

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = sdks.auth;
  const db = sdks.firestore;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = cred.user.uid;

      await setDoc(doc(db, 'users', uid), {
        uid,
        email,
        username,
        createdAt: new Date().toISOString()
      });

      router.push('/admin/blog');
    } catch (err: any) {
      console.error('register error', err);
      setError(err?.message || 'Ocorreu um erro ao criar a conta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
       <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Registrar</CardTitle>
          <CardDescription>Crie sua conta para gerenciar o blog.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={email} onChange={e => setEmail(e.target.value)} type="email" required />
            </div>
             <div className="space-y-2">
              <Label htmlFor="username">Nome de usuário</Label>
              <Input id="username" value={username} onChange={e => setUsername(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha (mínimo 6 caracteres)</Label>
              <Input id="password" value={password} onChange={e => setPassword(e.target.value)} type="password" required minLength={6} />
            </div>
             {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Criando...' : 'Criar conta'}</Button>
          </form>
           <p className="text-center text-sm text-muted-foreground mt-4">
            Já tem uma conta?{' '}
            <Link href="/admin/login" className="underline hover:text-primary">
              Faça login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
