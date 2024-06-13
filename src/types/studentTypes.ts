export interface RegisterStudentToCourse {
  alunoId: number;
  cursoId: number;
}

export interface RegisterStudentToCourseResponse {
  alunoId: number;
  cursoId: number;
}

export interface Answer {
  alunoId: number;
  questaoId: number;
  resposta: string;
  nota?: number;
}

export interface AnswerResponse {
  alunoId: number;
  questaoId: number;
  resposta: string;
  nota: number | null;
}
