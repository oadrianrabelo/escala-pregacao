"use client";
import React from "react";
import { Calendar, Download, FileText, Settings } from "lucide-react";
import { Culto, MESES } from "@/types/culto";
import Image from "next/image";
import { useConfig } from "../../../context/ConfigContext";
import { exportarIcal } from "@/utils/exportarIcal";

interface HeaderProps {
  mesAtual: number;
  anoAtual: number;
  cultos: Culto[];
  onMudarMes: (direcao: number) => void;
  onExportarTexto: () => void;
  onExportarPDF: () => void;
  onAbrirConfiguracao: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  mesAtual,
  anoAtual,
  cultos,
  onMudarMes,
  onExportarTexto,
  onExportarPDF,
  onAbrirConfiguracao,
}) => {
  const { nomeIgreja } = useConfig();
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Image
            src="/logo-circular.png"
            alt="Logo da Igreja"
            width={200}
            height={200}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Escala de Pregação
            </h1>
            <p className="text-gray-600">{nomeIgreja}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onAbrirConfiguracao}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition mr-2 border-r border-gray-200 pr-3"
            title="Configurações"
          >
            <Settings className="w-6 h-6" />
          </button>
          <button
            onClick={onExportarPDF}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            <FileText className="w-5 h-5" />
            Exportar PDF
          </button>
          <button
            onClick={onExportarTexto}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            <Download className="w-5 h-5" />
            Exportar TXT
          </button>
          <button
            onClick={() => exportarIcal(cultos)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            📅 Exportar iCal
          </button>
        </div>
      </div>

      {/* Seletor de Mês */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => onMudarMes(-1)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          ← Anterior
        </button>
        <h2 className="text-2xl font-bold text-gray-800 min-w-[200px] text-center">
          {MESES[mesAtual]} {anoAtual}
        </h2>
        <button
          onClick={() => onMudarMes(1)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Próximo →
        </button>
      </div>
    </div>
  );
};
