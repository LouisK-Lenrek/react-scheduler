import { Lit } from "./Lit";

export interface Mouvement {
  id: number;
  debut: Date;
  fin: Date;
  lit: Lit;
  libelle1: string;
  libelle2: string;
}
