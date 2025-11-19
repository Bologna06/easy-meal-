'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChefHat, Check, Star, Clock, Heart, Sparkles, Shield, TrendingUp, Zap } from 'lucide-react';

export default function AppPage() {
  const router = useRouter();

  return (
    <div>
      <Button
        onClick={() => router.push('/oferta')}
        size="lg"
        className="bg-white text-[#3BB273] hover:bg-gray-100 px-12 py-6 text-xl font-bold rounded-[14px]"
      >
        Fazer Upgrade Agora - R$ 19,90/mês
      </Button>
    </div>
  );
}