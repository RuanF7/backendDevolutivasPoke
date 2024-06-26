export interface UserInput {
  nome: string;
  email: string;
  senha: string;
  tipo: string;
}

export interface UserLogin {
  email: string;
  senha: string;
}

export interface UserLoginResponse {
  email: string;
  senha: string;
}
