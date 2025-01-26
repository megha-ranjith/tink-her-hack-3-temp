export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
}

export interface User {
  uid: string;
  displayName: string;
  email: string;
}

export interface MusicRecommendation {
  title: string;
  artist: string;
  mood: string;
  youtubeUrl: string;
}

export interface CareVideo {
  title: string;
  thumbnail: string;
  youtubeUrl: string;
  category: 'skin' | 'hair' | 'health';
}

export interface Class {
  id: string;
  name: string;
  type: string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  price: number;
  schedule: string[];
  rating: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  seller: {
    name: string;
    story: string;
  };
  category: string;
}