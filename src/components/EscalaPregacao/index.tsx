"use client";

import React, { useState } from "react";
import { Calendar, Plus } from "lucide-react";
import { useEscalaPregacao } from "@/hooks/useEscalaPregacao";
import { exportarParaTexto, exportarParaPDF } from "@/utils/exportar";
import { Tema } from "@/types/temas";
import { Header } from "./Header";
import { CultoCard } from "./CultoCard";
import { ModalCulto } from "./ModalCulto";
import { ModalSelecaoTema } from "./ModalSelecaoTema";
import { ListaPregadores } from "./ListaPregadores";
import { ModalConfiguracao } from "../../../components/EscalaPregacao/ModalConfiguracao";

const EscalaPregacao = () => {
  const {
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
  } = useEscalaPregacao();

  const [mostrarModalCulto, setMostrarModalCulto] = useState(false);
  const [mostrarModalTema, setMostrarModalTema] = useState(false);
  const [mostrarModalConfig, setMostrarModalConfig] = useState(false);

  const handleAdicionarCulto = (novoCulto: {
    data: string;
    tipoCulto: string;
    horario: string;
    pregador: string;
    observacoes: string;
  }) => {
    adicionarCulto(novoCulto);
    setMostrarModalCulto(false);
  };

  const handleExportarTexto = () => {
    exportarParaTexto(cultos, mesAtual, anoAtual);
  };

  const handleExportarPDF = (tema: Tema) => {
    exportarParaPDF(cultos, mesAtual, anoAtual, tema);
    setMostrarModalTema(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 fade-in">
      <div className="max-w-7xl mx-auto">
        <Header
          mesAtual={mesAtual}
          anoAtual={anoAtual}
          onMudarMes={mudarMes}
          onExportarTexto={handleExportarTexto}
          onExportarPDF={() => setMostrarModalTema(true)}
          onAbrirConfiguracao={() => setMostrarModalConfig(true)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Cultos do Mês
                </h3>
                <button
                  onClick={() => setMostrarModalCulto(true)}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar Culto
                </button>
              </div>

              {cultos.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Nenhum culto adicionado ainda</p>
                  <p className="text-sm">
                    Clique em "Adicionar Culto" para começar
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {getCultosOrdenados().map((culto) => (
                    <CultoCard
                      key={culto.id}
                      culto={culto}
                      pregadores={pregadores}
                      onAtualizar={atualizarCulto}
                      onRemover={removerCulto}
                      getDiaCor={getDiaCor}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <ListaPregadores
            pregadores={pregadores}
            onAdicionar={adicionarPregador}
            onRemover={removerPregador}
            onEditar={editarPregador}
          />
        </div>

        {mostrarModalCulto && (
          <ModalCulto
            pregadores={pregadores}
            onAdicionar={handleAdicionarCulto}
            onFechar={() => setMostrarModalCulto(false)}
          />
        )}

        {mostrarModalTema && (
          <ModalSelecaoTema
            onConfirmar={handleExportarPDF}
            onFechar={() => setMostrarModalTema(false)}
          />
        )}
        {mostrarModalConfig && (
          <ModalConfiguracao onFechar={() => setMostrarModalConfig(false)}
          />
        )}
      </div>
    </div>
  );
};

export default EscalaPregacao;
