import { Lit } from "./Lit";

export interface Salle {
  id: string;
  code: string;
  libelle1: string;
  lits: Lit[];
}
