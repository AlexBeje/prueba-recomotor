interface FavoriteCar {
  brand: string;
  model: string;
}

export interface User {
  _id: string;
  name: string;
  surname: string;
  email: string;
  favorites: FavoriteCar[];
}
