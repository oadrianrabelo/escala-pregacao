export interface Configuracao {
  nomeIgreja: string;
  tema: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
