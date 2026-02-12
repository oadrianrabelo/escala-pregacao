export interface Tema {
  id: string;
  nome: string;
  descricao: string;
  cores: {
    primaria: string;
    primariaDark: string;
    sabado: string;
    quarta: string;
    domingo: string;
    texto: string;
    textoSecundario: string;
    borda: string;
    fundoAlternado: string;
    fundoHover: string;
  };
}

export const TEMAS: Tema[] = [
  {
    id: "classico",
    nome: "Clássico P&B",
    descricao: "Preto e branco elegante e profissional",
    cores: {
      primaria: "#000000",
      primariaDark: "#1a1a1a",
      sabado: "#f5f5f5",
      quarta: "#ffffff",
      domingo: "#e8e8e8",
      texto: "#000000",
      textoSecundario: "#333333",
      borda: "#000000",
      fundoAlternado: "#fafafa",
      fundoHover: "#f0f0f0",
    },
  },
  {
    id: "azul",
    nome: "Azul Corporativo",
    descricao: "Azul profissional e moderno",
    cores: {
      primaria: "#2563eb",
      primariaDark: "#1e40af",
      sabado: "#eff6ff", // Blue-50 (Azul muito leve e sóbrio)
      quarta: "#f8fafc",
      domingo: "#ffffff", // Branco puro
      texto: "#000000",
      textoSecundario: "#2563eb",
      borda: "#cbd5e1",
      fundoAlternado: "#f8fafc",
      fundoHover: "#eff6ff",
    },
  },
  {
    id: "verde",
    nome: "Verde Esperança",
    descricao: "Verde suave e acolhedor",
    cores: {
      primaria: "#059669",
      primariaDark: "#047857",
      sabado: "#d1fae5",
      quarta: "#a7f3d0",
      domingo: "#6ee7b7",
      texto: "#000000",
      textoSecundario: "#047857",
      borda: "#10b981",
      fundoAlternado: "#f0fdf4",
      fundoHover: "#dcfce7",
    },
  },
  {
    id: "roxo",
    nome: "Roxo Majestoso",
    descricao: "Roxo elegante e distinto",
    cores: {
      primaria: "#7c3aed",
      primariaDark: "#6d28d9",
      sabado: "#ede9fe",
      quarta: "#e9d5ff",
      domingo: "#ddd6fe",
      texto: "#000000",
      textoSecundario: "#6d28d9",
      borda: "#c4b5fd",
      fundoAlternado: "#faf5ff",
      fundoHover: "#f3e8ff",
    },
  },
  {
    id: "laranja",
    nome: "Laranja Vibrante",
    descricao: "Laranja energético e caloroso",
    cores: {
      primaria: "#ea580c",
      primariaDark: "#c2410c",
      sabado: "#fed7aa",
      quarta: "#fef3c7",
      domingo: "#fde68a",
      texto: "#000000",
      textoSecundario: "#c2410c",
      borda: "#fb923c",
      fundoAlternado: "#fff7ed",
      fundoHover: "#ffedd5",
    },
  },
  {
    id: "marinho",
    nome: "Azul Marinho",
    descricao: "Azul escuro sofisticado",
    cores: {
      primaria: "#1e3a8a",
      primariaDark: "#1e40af",
      sabado: "#dbeafe",
      quarta: "#bfdbfe",
      domingo: "#93c5fd",
      texto: "#000000",
      textoSecundario: "#1e3a8a",
      borda: "#3b82f6",
      fundoAlternado: "#eff6ff",
      fundoHover: "#dbeafe",
    },
  },
  {
    id: "vinho",
    nome: "Vinho Elegante",
    descricao: "Vermelho escuro refinado",
    cores: {
      primaria: "#881337",
      primariaDark: "#9f1239",
      sabado: "#fecdd3",
      quarta: "#fda4af",
      domingo: "#fb7185",
      texto: "#000000",
      textoSecundario: "#881337",
      borda: "#f43f5e",
      fundoAlternado: "#fff1f2",
      fundoHover: "#ffe4e6",
    },
  },
  {
    id: "cinza",
    nome: "Cinza Minimalista",
    descricao: "Cinza moderno e clean",
    cores: {
      primaria: "#374151",
      primariaDark: "#1f2937",
      sabado: "#f3f4f6",
      quarta: "#e5e7eb",
      domingo: "#d1d5db",
      texto: "#000000",
      textoSecundario: "#374151",
      borda: "#6b7280",
      fundoAlternado: "#f9fafb",
      fundoHover: "#f3f4f6",
    },
  },
];
