export interface RegisterStudentToCourse {
  alunoId: number;
  cursoId: number;
}

export interface Answer {
  alunoId: number;
  questaoId: number;
  resposta: string;
  nota?: number;
}
