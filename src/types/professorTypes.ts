export interface Question {
  provaId: number;
  pergunta: string;
}

export interface DevelopingTest {
  nome: string;
  cursoId: number;
}

export interface Course {
  nome: string;
  professorId: number;
}

export interface Grade {
  alunoId: number;
  questaoId: number;
  nota: number;
}

export interface Professor {
  id: number;
  nome: string;
  tipo: string;
}
