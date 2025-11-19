// Sistema de gerenciamento de usuários e status premium
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  isPremium: boolean;
  paymentId?: string;
  paymentDate?: string;
  createdAt: string;
}

// Salvar usuário no localStorage
export function saveUser(user: User): void {
  const users = getUsers();
  const existingIndex = users.findIndex(u => u.id === user.id);
  
  if (existingIndex >= 0) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }
  
  localStorage.setItem('users', JSON.stringify(users));
  console.log('✅ Usuário salvo:', user.email, '| Premium:', user.isPremium);
}

// Obter todos os usuários
export function getUsers(): User[] {
  if (typeof window === 'undefined') return [];
  const usersData = localStorage.getItem('users');
  return usersData ? JSON.parse(usersData) : [];
}

// Obter usuário atual
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  const userData = localStorage.getItem('currentUser');
  return userData ? JSON.parse(userData) : null;
}

// Atualizar usuário atual
export function updateCurrentUser(updates: Partial<User>): void {
  const currentUser = getCurrentUser();
  if (!currentUser) return;
  
  const updatedUser = { ...currentUser, ...updates };
  localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  saveUser(updatedUser);
  
  console.log('✅ Usuário atualizado:', updatedUser.email, '| Premium:', updatedUser.isPremium);
}

// Liberar acesso premium após pagamento
export function grantPremiumAccess(paymentId: string): boolean {
  try {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
      console.error('❌ Nenhum usuário logado para liberar acesso');
      return false;
    }
    
    updateCurrentUser({
      isPremium: true,
      paymentId,
      paymentDate: new Date().toISOString()
    });
    
    console.log('🎉 ACESSO PREMIUM LIBERADO!');
    console.log('📧 Email:', currentUser.email);
    console.log('💳 Payment ID:', paymentId);
    console.log('📅 Data:', new Date().toLocaleString('pt-BR'));
    
    return true;
  } catch (error) {
    console.error('❌ Erro ao liberar acesso premium:', error);
    return false;
  }
}

// Verificar se usuário tem acesso premium
export function hasPremiumAccess(): boolean {
  const currentUser = getCurrentUser();
  return currentUser?.isPremium || false;
}

// Criar usuário temporário para checkout (caso não esteja logado)
export function createTempUserForCheckout(email: string): User {
  const tempUser: User = {
    id: Date.now(),
    name: 'Usuário Temporário',
    email,
    password: '',
    isPremium: false,
    createdAt: new Date().toISOString()
  };
  
  localStorage.setItem('currentUser', JSON.stringify(tempUser));
  saveUser(tempUser);
  
  console.log('✅ Usuário temporário criado para checkout:', email);
  return tempUser;
}

// Log de acesso premium
export function logPremiumAccess() {
  const currentUser = getCurrentUser();
  
  if (!currentUser) {
    console.log('❌ Nenhum usuário logado');
    return;
  }
  
  console.log('📊 STATUS DO USUÁRIO:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📧 Email:', currentUser.email);
  console.log('👤 Nome:', currentUser.name);
  console.log('✨ Premium:', currentUser.isPremium ? '✅ SIM' : '❌ NÃO');
  
  if (currentUser.isPremium) {
    console.log('💳 Payment ID:', currentUser.paymentId);
    console.log('📅 Data do Pagamento:', currentUser.paymentDate ? new Date(currentUser.paymentDate).toLocaleString('pt-BR') : 'N/A');
  }
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}
