"use client";

import React from "react";
import { X } from "lucide-react";
import { Culto, DIAS_SEMANA } from "@/types/culto";

interface CultoCardProps {
  culto: Culto;
  pregadores: string[];
  onAtualizar: (id: string, campo: keyof Culto, valor: string) => void;
  onRemover: (id: string) => void;
  getDiaCor: (data: Date) => string;
}

export const CultoCard: React.FC<CultoCardProps> = ({
  culto,
  pregadores,
  onAtualizar,
  onRemover,
  getDiaCor,
}) => {
  const diaSemana = DIAS_SEMANA[culto.data.getDay()];

  return (
    <div className={`border-2 rounded-lg p-4 ${getDiaCor(culto.data)}`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="font-bold text-lg text-gray-800">
            {culto.data.toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              weekday: "long",
            })}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {diaSemana}
            {culto.tipoCulto && ` - ${culto.tipoCulto}`}
          </div>
        </div>
        <button
          onClick={() => onRemover(culto.id)}
          className="text-red-600 hover:text-red-800 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Horário
          </label>
          <input
            type="time"
            value={culto.horario}
            onChange={(e) => onAtualizar(culto.id, "horario", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Culto (opcional)
          </label>
          <input
            type="text"
            value={culto.tipoCulto}
            onChange={(e) => onAtualizar(culto.id, "tipoCulto", e.target.value)}
            placeholder="Ex: Culto da Mulher, Kids, JA, Jovem, etc."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pregador
          </label>
          <select
            value={culto.pregador}
            onChange={(e) => onAtualizar(culto.id, "pregador", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Selecione o pregador...</option>
            {pregadores.map((pregador, index) => (
              <option key={index} value={pregador}>
                {pregador}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Observações
          </label>
          <input
            type="text"
            value={culto.observacoes}
            onChange={(e) =>
              onAtualizar(culto.id, "observacoes", e.target.value)
            }
            placeholder="Ex: Santa Ceia, Batismo, etc."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};
