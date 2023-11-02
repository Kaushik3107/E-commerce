export interface Signup {
  name: string;
  email: string;
  password: string;
}
export interface Login {
  email: string;
  password: string;
}

export interface product {
  quantity: number;
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  color: string;
  image: string;
}
