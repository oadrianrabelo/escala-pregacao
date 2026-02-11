export interface Culto {
  id: string;
  data: Date;
  tipoCulto: string;
  pregador: string;
  horario: string;
  observacoes: string;
}

export const MESES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export const DIAS_SEMANA = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

// Função para obter cor baseada no dia da semana
export const getCorPorDiaSemana = (diaSemana: number): string => {
  // 0 = Domingo, 6 = Sábado, 3 = Quarta
  if (diaSemana === 6) return "bg-blue-100 border-blue-300"; // Sábado
  if (diaSemana === 3) return "bg-green-100 border-green-300"; // Quarta
  if (diaSemana === 0) return "bg-purple-100 border-purple-300"; // Domingo
  return "bg-gray-100 border-gray-300"; // Outros dias
};

// Função para obter horário padrão baseado no dia da semana
export const getHorarioPadraoPorDia = (diaSemana: number): string => {
  if (diaSemana === 6) return "09:00"; // Sábado
  if (diaSemana === 3) return "19:30"; // Quarta
  if (diaSemana === 0) return "18:00"; // Domingo
  return "19:00"; // Padrão
};
