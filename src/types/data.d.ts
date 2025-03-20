export interface Response {
  cuentas: Cuenta[];
  muertes: Muerte[];
  fusilados: Fusilado[];
}

export interface Cuenta {
  id: number;
  position: number;
  user: string;
  followers: number;
  picture: string;
}

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
