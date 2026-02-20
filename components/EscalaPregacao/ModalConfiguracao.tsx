"use client";

import React, { useState } from "react";
import { useConfig } from "../../context/ConfigContext";
import { Settings, X } from "lucide-react";

interface ModalConfiguracaoProps {
  onFechar: () => void;
}

export const ModalConfiguracao: React.FC<ModalConfiguracaoProps> = ({
  onFechar,
}) => {
  const { nomeIgreja, setNomeIgreja } = useConfig();
  const [nomeTemp, setNomeTemp] = useState(nomeIgreja);

  const handleSalvar = () => {
    if (nomeTemp.trim()) {
      setNomeIgreja(nomeTemp);
      onFechar();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 slide-up">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2" >
            <Settings className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-800">Configurações</h3>
          </div>
          <button onClick={onFechar} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome da Igreja
            </label>
            <input type="text" value={nomeTemp} onChange={(e) => setNomeTemp(e.target.value)}
              placeholder="Ex: Igreja Adventista do Sétimo Dia"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1"> Este nome será exibido na escala de pregação</p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={handleSalvar}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Salvar
          </button>
        </div>
      </div>

    </div>
  )

}