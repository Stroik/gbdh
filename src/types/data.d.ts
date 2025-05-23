export interface Response {
  cuentas: Cuenta[];
  muertes: Muerte[];
  fusilados: Fusilado[];
}

export type Cuenta = {
  username: string; // nombre de usuario @xxx
  profile: string; // foto de perfil
  followers: number;
  tweets: number;
  following: number;
  likes: number;
  bio: string;
  position: number;
};

export interface Fusilado {
  user: string;
  dead_at: number | string;
}

export interface Muerte {
  user: string;
  followers: number | string;
  dead_at: number | Date | string;
  status: Status;
  now_is?: string;
}

export enum Status {
  Deshagoverizado = "Deshagoverizado",
  Ejecutado = "Ejecutado",
  EstadoActual = "Estado actual",
  Muerto = "Muerto",
  Resucitado = "Resucitado",
  Transmutado = "Transmutado",
}
