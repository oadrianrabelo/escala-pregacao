"use client";

import { useState, useEffect, useRef } from "react";

const STORAGE_KEY = "escala-pregacao-pregadores";

export const usePregadores = () => {
  const [pregadores, setPregadores] = useState<string[]>([]);
  const [carregando, setCarregando] = useState(true);
  const isInitialized = useRef(false);

  // Carregar pregadores
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const salvo = localStorage.getItem(STORAGE_KEY);
      setPregadores(salvo ? JSON.parse(salvo) : []);
    } catch (error) {
      console.error("Erro ao carregar pregadores:", error);
      setPregadores([]);
    } finally {
      isInitialized.current = true;
      setCarregando(false);
    }
  }, []);

  // Sincronizar com localStorage
  useEffect(() => {
    if (!isInitialized.current || carregando) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(pregadores));
  }, [pregadores, carregando]);

  const adicionarPregador = (nome: string) => {
    const nomeTrimado = nome.trim();
    if (nomeTrimado && !pregadores.includes(nomeTrimado)) {
      setPregadores([...pregadores, nomeTrimado]);
      return true;
    }
    return false;
  };

  const removerPregador = (index: number) => {
    setPregadores(pregadores.filter((_, i) => i !== index));
  };

  const editarPregador = (index: number, novoNome: string) => {
    const novosTrimado = novoNome.trim();
    if (novosTrimado) {
      const novo = [...pregadores];
      novo[index] = novosTrimado;
      setPregadores(novo);
      return true;
    }
    return false;
  };

  return {
    pregadores,
    carregando,
    adicionarPregador,
    removerPregador,
    editarPregador,
  };
};
