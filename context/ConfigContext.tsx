"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const STORAGE_KEY_NOME_IGREJA = "escala-pregacao-nome-igreja";
interface ConfigContextType {
  nomeIgreja: string;
  setNomeIgreja: (nome: string) => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [nomeIgreja, setNomeIgreja] = useState<string>(() => {
    if (typeof window === "undefined") return "Igreja Adventista do Sétimo Dia";

    try {
      const saved = localStorage.getItem(STORAGE_KEY_NOME_IGREJA);
      return saved ?? "Igreja Adventista do Sétimo Dia";
    } catch {
      return "Igreja Adventista do Sétimo Dia";
    }
  });

  useEffect(() => {
    // Salvar no localStorage quando nomeIgreja mudar
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(STORAGE_KEY_NOME_IGREJA, nomeIgreja);
    } catch {}
  }, [nomeIgreja]);

  return (
    <ConfigContext.Provider value={{ nomeIgreja, setNomeIgreja }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig deve ser usado dentro de ConfigProvider");
  }
  return context;
};
