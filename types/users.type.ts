interface FavoriteCar {
  id: number;
  brand: string;
  model: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  favorites: FavoriteCar[];
}
