"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { getHorarioPadraoPorDia } from "@/types/culto";

interface ModalCultoProps {
  pregadores: string[];
  onAdicionar: (culto: {
    data: string;
    tipoCulto: string;
    horario: string;
    pregador: string;
    observacoes: string;
  }) => void;
  onFechar: () => void;
}

export const ModalCulto: React.FC<ModalCultoProps> = ({
  pregadores,
  onAdicionar,
  onFechar,
}) => {
  const [novoCulto, setNovoCulto] = useState({
    data: "",
    tipoCulto: "",
    horario: "09:00",
    pregador: "",
    observacoes: "",
  });

  const handleDataChange = (data: string) => {
    const dataObj = new Date(data + "T00:00:00");
    const diaSemana = dataObj.getDay();
    const horarioPadrao = getHorarioPadraoPorDia(diaSemana);

    setNovoCulto({
      ...novoCulto,
      data,
      horario: horarioPadrao,
    });
  };

  const handleAdicionar = () => {
    if (!novoCulto.data) {
      alert("Por favor, selecione uma data para o culto!");
      return;
    }

    onAdicionar(novoCulto);
    setNovoCulto({
      data: "",
      tipoCulto: "",
      horario: "09:00",
      pregador: "",
      observacoes: "",
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">Adicionar Culto</h3>
          <button
            onClick={onFechar}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data do Culto *
            </label>
            <input
              type="date"
              value={novoCulto.data}
              onChange={(e) => handleDataChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              O horário será ajustado automaticamente conforme o dia da semana
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Culto (opcional)
            </label>
            <input
              type="text"
              value={novoCulto.tipoCulto}
              onChange={(e) =>
                setNovoCulto({ ...novoCulto, tipoCulto: e.target.value })
              }
              placeholder="Ex: Culto da Mulher, Kids, JA, Jovem, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Horário
            </label>
            <input
              type="time"
              value={novoCulto.horario}
              onChange={(e) =>
                setNovoCulto({ ...novoCulto, horario: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pregador (opcional)
            </label>
            <select
              value={novoCulto.pregador}
              onChange={(e) =>
                setNovoCulto({ ...novoCulto, pregador: e.target.value })
              }
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Observações
            </label>
            <input
              type="text"
              value={novoCulto.observacoes}
              onChange={(e) =>
                setNovoCulto({ ...novoCulto, observacoes: e.target.value })
              }
              placeholder="Ex: Santa Ceia, Batismo, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onFechar}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleAdicionar}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};
