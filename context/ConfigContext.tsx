"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ConfigContextType {
  nomeIgreja: string;
  setNomeIgreja: (nome: string) => void;
  carregando: boolean;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [nomeIgreja, setNomeIgreja] = useState(
    "Igreja Adventista do Sétimo Dia"
  );
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // Carregar do localStorage
    if (typeof window !== "undefined") {
      const salvo = localStorage.getItem("config-nome-igreja");
      if (salvo) {
        setNomeIgreja(salvo);
      }
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    // Salvar no localStorage quando mudar
    if (typeof window !== "undefined" && !carregando) {
      localStorage.setItem("config-nome-Igreja", nomeIgreja);
    }
  }, [nomeIgreja, carregando]);

  return (
    <ConfigContext.Provider value={{ nomeIgreja, setNomeIgreja, carregando }}>
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
