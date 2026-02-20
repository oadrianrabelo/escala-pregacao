import { Culto } from "@/types/culto";

export function exportarIcal(cultos: Culto[]): void {
  const events = cultos.map((culto) => {
    const dtStart = new Date(culto.data);
    const dtEnd = new Date(culto.data);
    dtEnd.setHours(dtEnd.getHours() + 1);

    const formatDate = (date: Date) =>
      date.toISOString().replace(/[-:.]/g, "").split("Z")[0];

    const description = `Pregador: ${culto.pregador || "N/A"}${culto.observacoes ? ` | ${culto.observacoes}` : ""}`;

    return `BEGIN:VEVENT
    UID:${culto.id}@escala-pregacao
    DTSTART:${formatDate(dtStart)}
    DTEND:${formatDate(dtEnd)}
    SUMMARY:Culto
    DESCRIPTION:${description}
    END:VEVENT`;
  });

  const ics = `BEGIN:VCALENDAR
  VERSION:2.0
  PROID:-//Escala de Pregação//PT
  CALSCALE:GREGORIAN
  ${events.join("\n")}
  END:VCALENDAR`;

  const blob = new Blob([ics], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `cultos-${new Date().toISOString().split("T")[0]}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL;
}
