'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ChefHat, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CadastroPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validações básicas
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    // Simular cadastro/login (em produção, conectar com backend)
    if (isLogin) {
      // Login
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: any) => u.email === formData.email && u.password === formData.password);
      
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        setSuccess('Login realizado com sucesso!');
        setTimeout(() => router.push('/app'), 1500);
      } else {
        setError('Email ou senha incorretos');
      }
    } else {
      // Cadastro
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Verificar se email já existe
      if (users.some((u: any) => u.email === formData.email)) {
        setError('Este email já está cadastrado');
        return;
      }

      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      setSuccess('Cadastro realizado com sucesso!');
      setTimeout(() => router.push('/app'), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3BB273]/10 to-[#FF8A42]/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <ChefHat className="w-12 h-12 text-[#3BB273]" />
            <span className="text-3xl font-bold text-[#4A4A4A]">Easy Meal</span>
          </div>
          <p className="text-gray-600">Planeje, cozinhe e viva melhor.</p>
        </div>

        {/* Card */}
        <Card className="p-8 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#4A4A4A] mb-2">
              {isLogin ? 'Entrar na sua conta' : 'Criar sua conta'}
            </h2>
            <p className="text-gray-600 text-sm">
              {isLogin 
                ? 'Acesse suas receitas e planejamentos' 
                : 'Comece a planejar suas refeições hoje'}
            </p>
          </div>

          {/* Alerts */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-[#4A4A4A] mb-2">
                  Nome Completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-[#4A4A4A] mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#4A4A4A] mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-[#4A4A4A] mb-2">
                  Confirmar Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="password"
                    placeholder="Digite a senha novamente"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-[#FF8A42] hover:bg-[#FF8A42]/90 text-white py-6 text-lg font-semibold"
            >
              {isLogin ? 'Entrar' : 'Criar Conta'}
            </Button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setSuccess('');
              }}
              className="text-[#3BB273] hover:underline text-sm font-semibold"
            >
              {isLogin 
                ? 'Não tem conta? Cadastre-se' 
                : 'Já tem conta? Faça login'}
            </button>
          </div>
        </Card>

        {/* Back Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/')}
            className="text-gray-600 hover:text-[#3BB273] text-sm font-semibold inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para página inicial
          </button>
        </div>

        {/* Info */}
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>Ao criar uma conta, você concorda com nossos</p>
          <p>Termos de Uso e Política de Privacidade</p>
        </div>
      </div>
    </div>
  );
}
