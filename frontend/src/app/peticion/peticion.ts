export interface Peticion {
  id?: number;
  //user
  user_id?: number;
  user?: {
      name: string
  }
  //categoria
  categoria_id: number;
  categoria?: {
      nombre:string
  }
  //peticion
  titulo: string;
  descripcion: string;
  destinatario: string;
  firmantes?: number;
  estado?: "aceptado" | "pendient" ;
  //foto
  file: {
      id?: number;
      file_path: string;
      name?: string
  };
}
