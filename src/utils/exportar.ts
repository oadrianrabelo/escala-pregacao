import { Culto, MESES, DIAS_SEMANA } from "@/types/culto";
import { Tema } from "@/types/temas";

export const exportarParaTexto = (
  cultos: Culto[],
  mes: number,
  ano: number
) => {
  let texto = `ESCALA DE PREGAÇÃO - ${MESES[mes].toUpperCase()} ${ano}\n`;
  texto += `Igreja Adventista do Sétimo Dia\n`;
  texto += `${"=".repeat(80)}\n\n`;

  const cultosOrdenados = [...cultos].sort(
    (a, b) => a.data.getTime() - b.data.getTime()
  );

  texto += `${"DATA".padEnd(20)} | ${"DIA".padEnd(15)} | ${"TIPO".padEnd(
    20
  )} | HORÁRIO | PREGADOR\n`;
  texto += `${"-".repeat(80)}\n`;

  cultosOrdenados.forEach((culto) => {
    const dataFormatada = culto.data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const diaSemana = DIAS_SEMANA[culto.data.getDay()];
    const tipo = culto.tipoCulto || "-";
    const pregador = culto.pregador || "(A definir)";

    texto += `${dataFormatada.padEnd(20)} | ${diaSemana.padEnd(
      15
    )} | ${tipo.padEnd(20)} | ${culto.horario.padEnd(7)} | ${pregador}\n`;

    if (culto.observacoes) {
      texto += `    Obs: ${culto.observacoes}\n`;
    }
  });

  texto += `\n${"=".repeat(80)}\n`;

  const blob = new Blob([texto], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `escala-pregacao-${MESES[mes]}-${ano}.txt`;
  a.click();
};

export const exportarParaPDF = (
  cultos: Culto[],
  mes: number,
  ano: number,
  tema: Tema
) => {
  const cultosOrdenados = [...cultos].sort(
    (a, b) => a.data.getTime() - b.data.getTime()
  );

  const conteudoHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Escala de Pregação - ${MESES[mes]} ${ano}</title>
      <style>
        @page {
          size: A4 landscape;
          margin: 0.8cm;
        }
        
        body {
          font-family: Arial, sans-serif;
          font-size: 11pt;
          color: ${tema.cores.texto};
          margin: 0;
          padding: 0;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        
        .header {
          text-align: center;
          margin-bottom: 10px;
        }
        
        .header h1 {
          margin: 0 0 5px 0;
          color: ${tema.cores.primaria};
          font-size: 18pt;
          font-weight: bold;
        }
        
        .header h2 {
          margin: 0;
          color: ${tema.cores.textoSecundario};
          font-size: 13pt;
          font-weight: normal;
        }
        
        .header p {
          margin: 5px 0 0 0;
          color: ${tema.cores.textoSecundario};
          font-size: 10pt;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }
        
        thead {
          background-color: ${tema.cores.primaria};
          color: white;
        }
        
        th {
          padding: 1px 1px;
          text-align: left;
          font-weight: bold;
          font-size: 12pt;
          border: 2px solid ${tema.cores.primariaDark};
        }
        
        tbody tr {
          page-break-inside: avoid;
        }
        
        tbody tr:nth-child(even) {
          background-color: ${tema.cores.fundoAlternado};
        }
        
        td {
          padding: 6px 5px;
          border: 1px solid ${tema.cores.borda};
          font-size: 10pt;
        }
        
        .col-data {
          width: 12%;
          font-weight: 600;
        }
        
        .col-dia {
          width: 15%;
        }
        
        .col-tipo {
          width: 18%;
        }
        
        .col-horario {
          width: 10%;
          text-align: center;
        }
        
        .col-pregador {
          width: 25%;
          font-weight: 600;
        }
        
        .col-obs {
          width: 20%;
          font-style: italic;
        }
        
        .dia-sabado {
          background-color: ${tema.cores.sabado} !important;
        }
        
        .dia-quarta {
          background-color: ${tema.cores.quarta} !important;
        }
        
        .dia-domingo {
          background-color: ${tema.cores.domingo} !important;
        }
        
        .footer {
          margin-top: 15px;
          padding-top: 8px;
          border-top: 2px solid ${tema.cores.borda};
          text-align: center;
          font-size: 9pt;
          color: ${tema.cores.textoSecundario};
        }
        
        .empty-state {
          text-align: center;
          padding: 40px;
          color: ${tema.cores.textoSecundario};
          font-style: italic;
        }

        .tema-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: ${tema.cores.primaria};
          color: white;
          padding: 5px 10px;
          border-radius: 5px;
          font-size: 8pt;
        }
      </style>
    </head>
    <body>
      
      
      <div class="header">
        <h1>ESCALA DE PREGAÇÃO - ${MESES[mes]} ${ano}</h1>
        <p>Igreja Adventista do Sétimo Dia</p>
      </div>
      
      ${cultosOrdenados.length === 0
      ? `
        <div class="empty-state">
          <p>Nenhum culto cadastrado para este mês.</p>
        </div>
      `
      : `
        <table>
          <thead>
            <tr>
              <th class="col-data">Data</th>
              <th class="col-dia">Dia da Semana</th>
              <th class="col-tipo">Tipo de Culto</th>
              <th class="col-horario">Horário</th>
              <th class="col-pregador">Pregador</th>
              <th class="col-obs">Observações</th>
            </tr>
          </thead>
          <tbody>
            ${cultosOrdenados
        .map((culto) => {
          const dataFormatada = culto.data.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });

          const diaSemana = DIAS_SEMANA[culto.data.getDay()];
          const diaSemanaNumero = culto.data.getDay();

          let classeCSS = "";
          if (diaSemanaNumero === 6) classeCSS = "dia-sabado";
          else if (diaSemanaNumero === 3) classeCSS = "dia-quarta";
          else if (diaSemanaNumero === 0) classeCSS = "dia-domingo";

          return `
                <tr class="${classeCSS}">
                  <td class="col-data">${dataFormatada}</td>
                  <td class="col-dia">${diaSemana}</td>
                  <td class="col-tipo">${culto.tipoCulto || "-"}</td>
                  <td class="col-horario">${culto.horario}</td>
                  <td class="col-pregador">${culto.pregador || "(A definir)"
            }</td>
                  <td class="col-obs">${culto.observacoes || "-"}</td>
                </tr>
              `;
        })
        .join("")}
          </tbody>
        </table>
      `
    }
      
    </body>
    </html>
  `;

  const blob = new Blob([conteudoHTML], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const janela = window.open(url, "_blank");

  if (janela) {
    janela.onload = () => {
      setTimeout(() => {
        janela.print();
      }, 250);
    };
  }
};
