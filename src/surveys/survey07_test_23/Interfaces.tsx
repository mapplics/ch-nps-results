export interface Nps7Answer {
    score: number, /// Puntaje que dio el usuario
    category: string, /// Categoría elegida
    answer: string, /// Respuesta del usuario
    id: string, /// ID de la respuesta
    createdAt: string, /// Fecha de creación de la respuesta
  }

export interface GraphProps {
  answers: Nps7Answer[];
  countTotal: number;
}

export interface AnswersTableProps {
  answers: Nps7Answer[];
}
