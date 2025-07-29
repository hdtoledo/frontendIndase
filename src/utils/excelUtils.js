import * as XLSX from "xlsx";

// General
export const generarExcelGeneral = (aprendices) => {
  const data = [];
  aprendices.forEach((a, i) => {
    a.asistencia.forEach((as) => {
      data.push({
        "#": i + 1,
        Documento: a.numeroDocumento,
        Nombre: `${a.nombres} ${a.apellidos}`,
        Ficha: a.numeroFicha,
        Formacion: a.formacion,
        Fecha: new Date(as.fecha).toLocaleDateString("es-CO"),
        Asistencia: as.asistio ? "Asistió" : "Faltó",
      });
    });
  });

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Informe General");
  XLSX.writeFile(wb, "informe-general.xlsx");
};

// Por Ficha
export const generarExcelFicha = (aprendices, ficha) => {
  const filtered = aprendices.filter((a) => a.numeroFicha === ficha);
  const data = [];
  filtered.forEach((a, i) => {
    a.asistencia.forEach((as) => {
      data.push({
        "#": i + 1,
        Documento: a.numeroDocumento,
        Nombre: `${a.nombres} ${a.apellidos}`,
        Fecha: new Date(as.fecha).toLocaleDateString("es-CO"),
        Asistencia: as.asistio ? "Asistió" : "Faltó",
      });
    });
  });

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, `Ficha-${ficha}`);
  XLSX.writeFile(wb, `informe-ficha-${ficha}.xlsx`);
};

// Por Aprendiz
export const generarExcelAprendiz = (aprendices, documento) => {
  const aprendiz = aprendices.find((a) => a.numeroDocumento === documento);
  if (!aprendiz) return alert("Aprendiz no encontrado");

  const data = aprendiz.asistencia.map((as, i) => ({
    "#": i + 1,
    Documento: aprendiz.numeroDocumento,
    Nombre: `${aprendiz.nombres} ${aprendiz.apellidos}`,
    Fecha: new Date(as.fecha).toLocaleDateString("es-CO"),
    Asistencia: as.asistio ? "Asistió" : "Faltó",
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Informe Aprendiz");
  XLSX.writeFile(wb, `informe-aprendiz-${documento}.xlsx`);
};