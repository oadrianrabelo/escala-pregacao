"use client";

import { useState, useEffect, useRef } from "react";
import { Culto, getCorPorDiaSemana } from "@/types/culto";

const STORAGE_KEY_CULTOS = "escala-pregacao-cultos";
const STORAGE_KEY_PREGADORES = "escala-pregacao-pregadores";

const PREGADORES_PADRAO = [
  "Pastor João",
  "Irmão Mateus",
  "Irmão Marcos",
  "Irmão Lucas",
  "Irmã Ester",
];

function carregarCultos(): Culto[] {
  if (typeof window === "undefined") return [];

  try {
    const json = localStorage.getItem(STORAGE_KEY_CULTOS);

    if (!json) return [];
    return JSON.parse(json).map((c: Culto) => ({
      ...c,
      data: new Date(c.data),
    }));
  } catch {
    return [];
  }
}

function carregarPregadores(): string[] {
  if (typeof window === "undefined") return PREGADORES_PADRAO;
  try {
    const json = localStorage.getItem(STORAGE_KEY_PREGADORES);
    if (!json) return PREGADORES_PADRAO;
    return JSON.parse(json);
  } catch {
    return PREGADORES_PADRAO;
  }
}

export const useEscalaPregacao = () => {
  const [cultos, setCultos] = useState<Culto[]>(() => carregarCultos());
  const [pregadores, setPregadores] = useState<string[]>(() =>
    carregarPregadores(),
  );
  const [mesAtual, setMesAtual] = useState(new Date().getMonth());
  const [anoAtual, setAnoAtual] = useState(new Date().getFullYear());
  const isInitialized = useRef(false);

  useEffect(() => {
    isInitialized.current = true;
  }, []);

  // Salva cultos quando mudam (após inicializar)
  useEffect(() => {
    if (!isInitialized.current) return;

    localStorage.setItem(STORAGE_KEY_CULTOS, JSON.stringify(cultos));
  }, [cultos]);

  // Salva pregadores quando mudam (após inicializar)
  useEffect(() => {
    if (!isInitialized.current) return;

    localStorage.setItem(STORAGE_KEY_PREGADORES, JSON.stringify(pregadores));
  }, [pregadores]);

  const adicionarCulto = (
    novoCulto: Omit<Culto, "id" | "data"> & { data: string },
  ) => {
    const cultoParaAdicionar: Culto = {
      id: `culto-${Date.now()}`,
      data: new Date(novoCulto.data + "T00:00:00"),
      tipoCulto: novoCulto.tipoCulto,
      pregador: novoCulto.pregador,
      horario: novoCulto.horario,
      observacoes: novoCulto.observacoes,
    };

    setCultos([...cultos, cultoParaAdicionar]);
  };

  const atualizarCulto = (id: string, campo: keyof Culto, valor: string) => {
    setCultos(
      cultos.map((culto) =>
        culto.id === id ? { ...culto, [campo]: valor } : culto,
      ),
    );
  };

  const removerCulto = (id: string) => {
    setCultos(cultos.filter((culto) => culto.id !== id));
  };

  const adicionarPregador = (nome: string) => {
    if (nome.trim()) {
      setPregadores([...pregadores, nome.trim()]);
    }
  };

  const removerPregador = (index: number) => {
    setPregadores(pregadores.filter((_, i) => i !== index));
  };

  const editarPregador = (index: number, novoNome: string) => {
    const novosPregadores = [...pregadores];
    novosPregadores[index] = novoNome;
    setPregadores(novosPregadores);
  };

  const mudarMes = (direcao: number) => {
    let novoMes = mesAtual + direcao;
    let novoAno = anoAtual;

    if (novoMes > 11) {
      novoMes = 0;
      novoAno++;
    } else if (novoMes < 0) {
      novoMes = 11;
      novoAno--;
    }

    setMesAtual(novoMes);
    setAnoAtual(novoAno);
  };

  const getCultosOrdenados = () => {
    return [...cultos].sort((a, b) => a.data.getTime() - b.data.getTime());
  };

  const getDiaCor = (data: Date): string => {
    return getCorPorDiaSemana(data.getDay());
  };

  return {
    mesAtual,
    anoAtual,
    cultos,
    pregadores,
    adicionarCulto,
    atualizarCulto,
    removerCulto,
    adicionarPregador,
    removerPregador,
    editarPregador,
    mudarMes,
    getCultosOrdenados,
    getDiaCor,
  };
};
