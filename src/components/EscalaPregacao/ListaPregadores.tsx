"use client";

import React, { useState } from "react";
import { Users, Plus, X, Edit2, Save } from "lucide-react";

interface ListaPregadoresProps {
  pregadores: string[];
  onAdicionar: (nome: string) => void;
  onRemover: (index: number) => void;
  onEditar: (index: number, novoNome: string) => void;
}

export const ListaPregadores: React.FC<ListaPregadoresProps> = ({
  pregadores,
  onAdicionar,
  onRemover,
  onEditar,
}) => {
  const [novoPregador, setNovoPregador] = useState("");
  const [editandoPregador, setEditandoPregador] = useState<number | null>(null);

  const handleAdicionar = () => {
    if (novoPregador.trim()) {
      onAdicionar(novoPregador);
      setNovoPregador("");
    }
  };

  const handleEditar = (index: number, novoNome: string) => {
    onEditar(index, novoNome);
    setEditandoPregador(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6 fade-in">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold text-gray-800">Pregadores</h3>
        </div>

        <div className="space-y-2 mb-4">
          {pregadores.map((pregador, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg group"
            >
              {editandoPregador === index ? (
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="text"
                    defaultValue={pregador}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleEditar(
                          index,
                          (e.target as HTMLInputElement).value
                        );
                      }
                    }}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded"
                    autoFocus
                  />
                  <button
                    onClick={(e) => {
                      const input =
                        e.currentTarget.parentElement?.querySelector("input");
                      if (input) {
                        handleEditar(index, input.value);
                      }
                    }}
                    className="text-green-600 hover:text-green-800"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <span className="text-gray-700">{pregador}</span>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => setEditandoPregador(index)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onRemover(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={novoPregador}
            onChange={(e) => setNovoPregador(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAdicionar()}
            placeholder="Nome do pregador..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleAdicionar}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-3">Cores por Dia</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border-2 bg-blue-100 border-blue-300"></div>
            <span className="text-sm text-gray-700">Sábado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border-2 bg-green-100 border-green-300"></div>
            <span className="text-sm text-gray-700">Quarta-feira</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border-2 bg-purple-100 border-purple-300"></div>
            <span className="text-sm text-gray-700">Domingo</span>
          </div>
        </div>
      </div>
    </div>
  );
};
