import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// 📌 Informe General
export const generarPDFGeneral = (aprendices) => {
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text("Informe General de Asistencias", 14, 15);

  const data = aprendices.map((a, index) => [
    index + 1,
    `${a.nombres} ${a.apellidos}`,
    a.numeroDocumento,
    a.numeroFicha,
    a.formacion,
    a.asistencia?.length
      ? a.asistencia
          .map(
            (as) =>
              `${new Date(as.fecha).toLocaleDateString("es-CO")} - ${
                as.asistio ? "Asistió" : "Faltó"
              }`
          )
          .join("\n")
      : "Sin registros",
  ]);

  autoTable(doc, {
    startY: 25,
    head: [["#", "Nombre", "Documento", "Ficha", "Formación", "Asistencias"]],
    body: data,
    styles: { fontSize: 10 },
  });

  doc.save("InformeGeneral.pdf");
};

// 📌 Informe por Ficha
export const generarPDFPorFicha = (aprendices, numeroFicha) => {
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text(`Informe de Ficha ${numeroFicha}`, 14, 15);

  const filtrados = aprendices.filter((a) => a.numeroFicha === numeroFicha);

  const data = filtrados.map((a, index) => [
    index + 1,
    `${a.nombres} ${a.apellidos}`,
    a.numeroDocumento,
    a.formacion,
    a.asistencia?.length
      ? a.asistencia
          .map(
            (as) =>
              `${new Date(as.fecha).toLocaleDateString("es-CO")} - ${
                as.asistio ? "Asistió" : "Faltó"
              }`
          )
          .join("\n")
      : "Sin registros",
  ]);

  autoTable(doc, {
    startY: 25,
    head: [["#", "Nombre", "Documento", "Formación", "Asistencias"]],
    body: data,
    styles: { fontSize: 10 },
  });

  doc.save(`InformeFicha_${numeroFicha}.pdf`);
};

// 📌 Informe por Aprendiz
export const generarPDFPorAprendiz = (aprendiz) => {
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text(
    `Informe de ${aprendiz.nombres} ${aprendiz.apellidos}`,
    14,
    15
  );

  const data = aprendiz.asistencia?.length
    ? aprendiz.asistencia.map((as, index) => [
        index + 1,
        new Date(as.fecha).toLocaleDateString("es-CO"),
        as.asistio ? "Asistió" : "Faltó",
      ])
    : [["-", "-", "Sin registros"]];

  autoTable(doc, {
    startY: 25,
    head: [["#", "Fecha", "Estado"]],
    body: data,
    styles: { fontSize: 10 },
  });

  doc.save(`Informe_${aprendiz.nombres}_${aprendiz.apellidos}.pdf`);
};

// 📌 Exportar General a Excel
export const generarExcelGeneral = (aprendices) => {
  const ws = XLSX.utils.json_to_sheet(
    aprendices.map((a, index) => ({
      "#": index + 1,
      Nombre: `${a.nombres} ${a.apellidos}`,
      Documento: a.numeroDocumento,
      Ficha: a.numeroFicha,
      Formación: a.formacion,
      Asistencias: a.asistencia?.length
        ? a.asistencia
            .map(
              (as) =>
                `${new Date(as.fecha).toLocaleDateString("es-CO")} - ${
                  as.asistio ? "Asistió" : "Faltó"
                }`
            )
            .join(" | ")
        : "Sin registros",
    }))
  );

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "InformeGeneral");

  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "InformeGeneral.xlsx");
};
