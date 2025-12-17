import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [role, setRole] = useState<'visitor' | 'advertiser'>('visitor');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (password !== confirmPassword) {
            setError("As senhas não coincidem.");
            setLoading(false);
            return;
        }

        try {
            // 1. Sign up
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
            });

            if (authError) throw authError;

            if (authData.user) {
                // 2. Create Profile
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert({
                        id: authData.user.id,
                        display_name: displayName,
                        role: role,
                    } as any);

                if (profileError) {
                    console.error("Profile creation failed", profileError);
                }
            }

            navigate('/');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-card border border-border rounded-xl shadow-lg p-8"
            >
                <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                    Junte-se à Luxuria
                </h2>

                {error && (
                    <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Nome de Exibição</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            placeholder="Seu Nome"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu@email.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Senha</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="********"
                            minLength={6}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Confirmar Senha</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="********"
                            minLength={6}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Eu quero...</label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setRole('visitor')}
                                className={cn(
                                    "py-2 rounded-md border text-sm transition-colors",
                                    role === 'visitor' ? "bg-primary/10 border-primary text-primary" : "border-input hover:bg-muted"
                                )}
                            >
                                Navegar
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('advertiser')}
                                className={cn(
                                    "py-2 rounded-md border text-sm transition-colors",
                                    role === 'advertiser' ? "bg-primary/10 border-primary text-primary" : "border-input hover:bg-muted"
                                )}
                            >
                                Anunciar
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={cn(
                            "w-full bg-primary text-primary-foreground py-2 rounded-md font-medium transition-opacity",
                            loading && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        {loading ? 'Criando Conta...' : 'Criar Conta'}
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-muted-foreground">
                    Já tem uma conta?{' '}
                    <Link to="/login" className="text-primary hover:underline">
                        Entrar
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
