import { Tournament, TournamentStatus, User, UserRole, Transaction } from '../types';

// Initial Mock Data
const MOCK_TOURNAMENTS: Tournament[] = [
  {
    id: 't1',
    title: 'Bermuda Blitz #42',
    map: 'Bermuda',
    mode: 'Squad',
    entryFee: 50,
    prizePool: 2000,
    maxPlayers: 48,
    currentPlayers: 32,
    status: TournamentStatus.OPEN,
    startTime: new Date(Date.now() + 86400000).toISOString(),
    imageUrl: 'https://picsum.photos/800/400?random=1'
  },
  {
    id: 't2',
    title: 'Purgatory Solo King',
    map: 'Purgatory',
    mode: 'Solo',
    entryFee: 20,
    prizePool: 800,
    maxPlayers: 48,
    currentPlayers: 48,
    status: TournamentStatus.FULL,
    startTime: new Date(Date.now() + 3600000).toISOString(),
    imageUrl: 'https://picsum.photos/800/400?random=2'
  },
  {
    id: 't3',
    title: 'Kalahari Clash',
    map: 'Kalahari',
    mode: 'Duo',
    entryFee: 100,
    prizePool: 5000,
    maxPlayers: 24,
    currentPlayers: 12,
    status: TournamentStatus.OPEN,
    startTime: new Date(Date.now() + 172800000).toISOString(),
    imageUrl: 'https://picsum.photos/800/400?random=3'
  }
];

const MOCK_USER: User = {
  id: 'u1',
  username: 'ProGamer_99',
  email: 'user@example.com',
  role: UserRole.USER,
  balance: 1500,
  gameId: '123456789',
  avatarUrl: 'https://picsum.photos/200/200?random=10'
};

const MOCK_ADMIN: User = {
  id: 'a1',
  username: 'AdminMaster',
  email: 'admin@example.com',
  role: UserRole.ADMIN,
  balance: 0,
  gameId: '000000',
  avatarUrl: 'https://picsum.photos/200/200?random=11'
};

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'tx1', userId: 'u1', amount: 500, type: 'DEPOSIT', status: 'COMPLETED', date: new Date(Date.now() - 100000000).toISOString() },
  { id: 'tx2', userId: 'u1', amount: -50, type: 'ENTRY_FEE', status: 'COMPLETED', date: new Date(Date.now() - 80000000).toISOString() }
];

// Service Implementation
class MockService {
  private tournaments: Tournament[] = MOCK_TOURNAMENTS;
  private currentUser: User | null = null;
  private transactions: Transaction[] = MOCK_TRANSACTIONS;

  // Auth
  login(email: string): User | null {
    if (email === 'admin@example.com') {
      this.currentUser = MOCK_ADMIN;
      return MOCK_ADMIN;
    } else if (email === 'user@example.com') {
      this.currentUser = MOCK_USER;
      return MOCK_USER;
    }
    return null;
  }

  logout() {
    this.currentUser = null;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  // Tournaments
  getTournaments(): Tournament[] {
    return [...this.tournaments];
  }

  getMyTournaments(userId: string): Tournament[] {
    // Mock logic: returns the first tournament as if joined
    return [this.tournaments[1]];
  }

  createTournament(data: Omit<Tournament, 'id' | 'currentPlayers' | 'status'>): Tournament {
    const newTournament: Tournament = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      currentPlayers: 0,
      status: TournamentStatus.OPEN
    };
    this.tournaments.push(newTournament);
    return newTournament;
  }

  deleteTournament(id: string) {
    this.tournaments = this.tournaments.filter(t => t.id !== id);
  }

  // Wallet
  getTransactions(userId: string): Transaction[] {
    return this.transactions.filter(t => t.userId === userId);
  }

  joinTournament(tournamentId: string): boolean {
    if (!this.currentUser) return false;
    const tournament = this.tournaments.find(t => t.id === tournamentId);
    if (tournament && this.currentUser.balance >= tournament.entryFee) {
        this.currentUser.balance -= tournament.entryFee;
        tournament.currentPlayers += 1;
        this.transactions.unshift({
            id: Math.random().toString(36),
            userId: this.currentUser.id,
            amount: -tournament.entryFee,
            type: 'ENTRY_FEE',
            status: 'COMPLETED',
            date: new Date().toISOString()
        })
        return true;
    }
    return false;
  }
}

export const mockService = new MockService();