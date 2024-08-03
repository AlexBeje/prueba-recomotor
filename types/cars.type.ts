interface Model {
  name: string;
  img: string;
}

export interface Car {
  _id: string;
  brand: string;
  model: Model[];
}
