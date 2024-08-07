import { Mouvement } from "./Mouvement";

export interface Occupation extends Mouvement {
  mouvementDebut: Mouvement;
  mouvementFin: Mouvement;
  finPrevisionnelle: Date;
}
