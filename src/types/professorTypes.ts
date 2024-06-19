export interface Question {
  provaId: number;
  pergunta: string;
}

export interface QuestionResponse {
  id: number;
  provaId: number;
  pergunta: string;
}

export interface CreatingTest {
  nome: string;
  cursoId: number;
}

export interface CreatingTestResponse {
  id: number;
  nome: string;
  cursoId: number;
}

export interface Course {
  nome: string;
  professorId: number;
}
export interface CourseResponse {
  id: number;
  nome: string;
  professorId: number;
}

export interface Grade {
  alunoId: number;
  questaoId: number;
  nota: number;
}

export interface GradeResponse {
  alunoId: number;
  questaoId: number;
  resposta: string;
  nota: number | null;
}

export interface Professor {
  id: number;
  nome: string;
  tipo: string;
}

export interface PokemonData {
  nome: string;
  tipo: string;
  golpe: string;
  imagem: string;
}

export interface PokemonDataResponse {
  id: number;
  nome: string;
  tipo: string;
  golpe: string;
  imagem: string;
}

export interface ProfessorAddPokemon {
  professorId: number;
  pokemonName: string;
}

export interface ProfessorAddPokemonResponse {
  id: number;
  nome: string;
  tipo: string;
  golpe: string;
  imagem: string;
  professorId: number;
}

export interface HavePokemon {
  professorId: number;
  nome: string;
}
