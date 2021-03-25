import functions from "@/pdf/functions";

function generatePdf() {
  functions.start();
  functions.text(50, "hola", 20, 15, "bold");
  functions.text(50, "hola", 20, 40);
  functions.text(50, "hola", 20, 60, "light");
}
function portada(name, asesor, lenguage) {
  functions.start();
  functions.graphicsFront();
  functions.text(
    35,
    lenguage == "Español" ? "PROPUESTA" : "PROPOSAL",
    20,
    10,
    "bold",
    1
  );
  functions.text(35, name, 20, 15, "", 1);

  functions.text(
    25,
    (lenguage == "Español" ? "Teléfono Oficina:" : "Ofice Phone:") +
      " + 52 1 984 164 2844",
    70,
    54,
    2
  );
  functions.text(25, "hola@propiedadesplayadelcarmen.mx", 70, 58, 2);
  functions.text(25, "Av. CTM Mzn 164 lote 001, Zazil-ha, 77710", 70, 62, 2);
  functions.text(25, "Playa del Carmen, Q.R.", 70, 66, 2);
  functions.agent(asesor, 470, 110, lenguage, 1);

  functions.photoShow();
}
function departamentos(name, dep, asesor, lenguage, datos, moneda, tipoCambio) {
  functions.blueprints(dep, asesor, lenguage);
  functions.EconomicProposal(dep, lenguage, datos, moneda, tipoCambio);
  functions.end(name);
}

export default {
  generatePdf,
  portada,
  departamentos,
};
