export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export enum TournamentStatus {
  OPEN = 'OPEN',
  FULL = 'FULL',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  balance: number;
  gameId: string;
  avatarUrl: string;
}

export interface Tournament {
  id: string;
  title: string;
  map: string; // Bermuda, Purgatory, Kalahari
  mode: string; // Solo, Duo, Squad
  entryFee: number;
  prizePool: number;
  maxPlayers: number;
  currentPlayers: number;
  status: TournamentStatus;
  startTime: string; // ISO date string
  imageUrl: string;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'ENTRY_FEE' | 'PRIZE';
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  date: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}