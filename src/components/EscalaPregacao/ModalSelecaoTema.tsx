"use client";

import React, { useState } from "react";
import { X, Check, Palette } from "lucide-react";
import { TEMAS, Tema } from "@/types/temas";

interface ModalSelecaoTemaProps {
  onConfirmar: (tema: Tema) => void;
  onFechar: () => void;
}

export const ModalSelecaoTema: React.FC<ModalSelecaoTemaProps> = ({
  onConfirmar,
  onFechar,
}) => {
  const [temaSelecionado, setTemaSelecionado] = useState<Tema>(TEMAS[1]); // Azul como padrão

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Palette className="w-7 h-7 text-blue-600" />
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                Escolha o Tema
              </h3>
              <p className="text-sm text-gray-600">
                Selecione a aparência do seu relatório PDF
              </p>
            </div>
          </div>
          <button
            onClick={onFechar}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {TEMAS.map((tema) => (
            <button
              key={tema.id}
              onClick={() => setTemaSelecionado(tema)}
              className={`relative p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                temaSelecionado.id === tema.id
                  ? "border-blue-600 bg-blue-50 shadow-lg"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {temaSelecionado.id === tema.id && (
                <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1">
                  <Check className="w-4 h-4" />
                </div>
              )}

              <div className="mb-3">
                <h4 className="font-bold text-lg mb-1">{tema.nome}</h4>
                <p className="text-xs text-gray-600">{tema.descricao}</p>
              </div>

              {/* Preview do tema */}
              <div className="space-y-2">
                <div
                  className="h-8 rounded flex items-center justify-center text-white font-semibold text-sm"
                  style={{ backgroundColor: tema.cores.primaria }}
                >
                  Cabeçalho
                </div>
                <div className="space-y-1">
                  <div
                    className="h-6 rounded border"
                    style={{
                      backgroundColor: tema.cores.sabado,
                      borderColor: tema.cores.borda,
                    }}
                  >
                    <span className="text-xs px-2">Sábado</span>
                  </div>
                  <div
                    className="h-6 rounded border"
                    style={{
                      backgroundColor: tema.cores.quarta,
                      borderColor: tema.cores.borda,
                    }}
                  >
                    <span className="text-xs px-2">Quarta</span>
                  </div>
                  <div
                    className="h-6 rounded border"
                    style={{
                      backgroundColor: tema.cores.domingo,
                      borderColor: tema.cores.borda,
                    }}
                  >
                    <span className="text-xs px-2">Domingo</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onFechar}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirmar(temaSelecionado)}
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Gerar PDF com este Tema
          </button>
        </div>
      </div>
    </div>
  );
};
