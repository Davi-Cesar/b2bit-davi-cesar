export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Tokens {
    access: string;
    refresh: string;
}

export interface Avatar {
    id: number;
    high: string;
    medium: string;
    low: string;
  }
  
export interface Profile {
    id: number;
    name: string;
    email: string;
    is_active: boolean;
    avatar: Avatar;
    type: string;
    created: string;
    modified: string;
    role: string;
}
