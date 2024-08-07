export interface Sejour {
  id: number;
  numero: string;
  dateDebut: Date;
  dateFin: Date;
  preSortie: Date;
  dateFinPrevisionnelle: Date;
  dateAdmission: Date;
  dateMessageAdmission: Date;
  dateMessageDecisionSortie: Date;
  type: string;
}
