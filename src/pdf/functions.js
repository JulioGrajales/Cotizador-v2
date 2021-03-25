import { jsPDF } from "jspdf";
import "jspdf-autotable";
import LatoBoldnormal from "@/pdf/fonts/LatoBoldnormal";
import LatoRegularnormal from "@/pdf/fonts/LatoRegularnormal";
import LatoLightnormal from "@/pdf/fonts/LatoLightnormal";

let logo = [
  "https://res.cloudinary.com/the-boat-playa-del-carmen/image/upload/f_auto,q_auto:eco/v1599839658/the-boat/media/the_boat_black.png",
  "https://res.cloudinary.com/capital28-investments/image/upload/w_220,f_auto,q_auto/v1554135055/the-boat/media/TheBoatLogo.png",
];

let galeria = [
  "https://www.preferredrealestate.com.mx/wp-content/uploads/2019/02/The_Boat_050417_CAM04-1.jpg",
  "https://pdc-2df4.kxcdn.com/wp-content/uploads/2020/08/the-boat-fachada-playa-del-carmen2-scaled.jpg",
  "https://image.flaticon.com/icons/png/512/61/61205.png",
];

let doc;
let color = [
  [4, 41, 86],
  [219, 224, 224],
  [99, 101, 101],
  [40, 48, 66],
];

LatoRegularnormal();
LatoBoldnormal();
LatoLightnormal();

function start() {
  doc = jsPDF("l", "mm", [677.3, 381]);
}
function end(name) {
  doc.addPage();
  bg("white");
  doc.addImage(logo[0], "PNG", 288.65, 161.5, 100, 58);
  //doc.output("dataurlnewwindow");
  doc.save(name + ".pdf");
}
function text(tamaño, texto, x, y, font, c) {
  switch (font) {
    case "bold":
      doc.setFont("Lato-Bold", "normal");
      break;
    case "light":
      doc.setFont("Lato-Light", "normal");
      break;

    default:
      doc.setFont("Lato-Regular", "normal");
      break;
  }
  c == 1 ? doc.setTextColor(40, 46, 66) : doc.setTextColor(219, 224, 224);
  doc.setFontSize(tamaño);
  doc.text(texto, x * 6.773, y * 3.81);
}

function graphicsFront() {
  doc.setDrawColor(0);
  doc.setFillColor(color[1][0], color[1][1], color[1][2]);
  doc.rect(0, 0, 677.3, 190.5, "F");

  doc.setDrawColor(0);
  doc.setFillColor(color[0][0], color[0][1], color[0][2]);
  doc.rect(0, 190.5, 677.3, 190.5, "F");

  doc.setDrawColor(color[3][0], color[3][1], color[3][2]);
  doc.setLineWidth(0.7);
  doc.line(20 * 6.773, 43, 250, 43);

  doc.addImage(logo[0], "PNG", 35, 15, 100 * 0.8, 58 * 0.8);
  doc.addImage(galeria[0], "JPG", 35, 78.9, 409.6, 223.2);
}

function agent(name, x, y, lenguage, c) {
  c == 1 ? doc.setTextColor(40, 46, 66) : doc.setTextColor(219, 224, 224);
  doc.addImage(galeria[2], "PNG", x, y, 60, 0);

  doc.setFont("Lato-Bold", "normal");
  doc.setFontSize(30);
  doc.text(name, x + 70, y + 23);

  doc.setFont("Lato-Regular", "normal");
  doc.setFontSize(30);
  doc.text(
    lenguage == "Español" ? "Profesional Inmobiliario" : "Real Estate Agent",
    x + 70,
    y + 36
  );
}
function photoShow() {
  doc.addPage();
  bg("dark");
  doc.addImage(galeria[1], "JPG", 105.92, 0, 465.45, 310.36);
  botttomLogo(logo[1]);
}
function bg(c) {
  doc.setDrawColor(0);
  c == "white"
    ? doc.setFillColor(color[1][0], color[1][1], color[1][2])
    : doc.setFillColor(color[0][0], color[0][1], color[0][2]);
  doc.rect(0, 0, 677.3, 381, "F");
}

function blueprints(dep, asesor, lenguage) {
  let t = 0.4;
  let dx = 0;
  let titulo;
  for (let a of dep) {
    doc.addPage();

    doc.setDrawColor(0);
    doc.setFillColor(color[1][0], color[1][1], color[1][2]);
    doc.rect(0, 0, 677.3, 190.5, "F");

    doc.setDrawColor(0);
    doc.setFillColor(color[0][0], color[0][1], color[0][2]);
    doc.rect(0, 190.5, 677.3, 190.5, "F");

    doc.setDrawColor(0);
    doc.setFillColor(255, 255, 255);
    if (a.building.total < 35) {
      dx = 70;
      doc.rect(20, 78.9, 409.6, 223.2, "F");
      doc.addImage(
        a.media.featured_image.src,
        "PNG",
        224.8 - (900 * t) / 2,
        110,
        900 * t,
        0
      );
    } else if (a.building.total > 100) {
      dx = 70;
      doc.rect(20, 58.9, 279.6, 283.2, "F");
      doc.addImage(
        a.media.featured_image.src,
        "PNG",
        159.8 - (550 * t) / 2,
        80,
        600 * t,
        0
      );
    } else if (a.building.total < 98 && a.building.total > 90) {
      dx = 70;
      doc.rect(20, 58.9, 279.6, 283.2, "F");
      doc.addImage(
        a.media.featured_image.src,
        "PNG",
        159.8 - (550 * t) / 2,
        70,
        510 * t,
        0
      );
    } else {
      dx = 70;
      doc.rect(20, 58.9, 279.6, 283.2, "F");
      doc.addImage(
        a.media.featured_image.src,
        "PNG",
        159.8 - (650 * t) / 2,
        80,
        650 * t,
        0
      );
    }
    botttomLogo(logo[1]);

    titulo =
      lenguage == "Español"
        ? "UNIDAD"
        : "UNIT" + ' "' + a.code.slice(0, -3) + "-" + a.code.slice(1) + '"';
    text(40, titulo, 10, 10, "bold", 1);
    text(
      35,
      lenguage == "Español" ? "SUPERFICIE" : "SURFACE",
      dx,
      55,
      "bold",
      2
    );
    text(
      25,
      lenguage == "Español" ? "Departamento " : "Department",
      dx,
      60,
      "bold",
      2
    );
    text(25, lenguage == "Español" ? "Terraza " : "Terrace", dx, 64, "bold", 2);
    text(25, "Total ", dx, 68, "bold", 2);

    text(25, a.building.construction + " m²", dx + 10, 60, "", 2);
    text(25, a.building.terrace + " m²", dx + 10, 64, "", 2);
    text(25, a.building.total + " m²", dx + 10, 68, "", 2);
    agent(asesor, 470, 110, lenguage, 1);
  }
}

function EconomicProposal(dep, lenguage, datos, moneda, tipoCambio) {
  doc.addPage();
  bg("dark");
  text(
    40,
    lenguage == "Español" ? "PROPUESTA ECONÓMICA" : "ECONOMIC PROPOSAL",
    10,
    10,
    "bold",
    2
  );

  let body = [];
  for (let a of dep) {
    body.push([
      a.code,
      a.floor.code,
      a.building.type,
      a.features.bathrooms,
      a.building.construction + " m²",
      a.building.terrace + " m²",
      a.building.total + " m²",
      moneda == "MXN"
        ? "MXN $" + new Intl.NumberFormat().format(a.pricing.price * tipoCambio)
        : "USD $" + new Intl.NumberFormat().format(a.pricing.price),
      // Temporal por que despues se puede corregir aun que no esta demas si se utiliza el archivo en otro proyecto..:)
    ]);
  }
  doc.autoTable({
    margin: { top: 70 },
    body: [
      [
        {
          content: lenguage == "Español" ? "UNIDADES" : "UNITS",
          styles: {
            halign: "center",
            fontSize: 30,
            font: "Lato-Bold",
          },
        },
      ],
    ],
  });

  doc.autoTable({
    head: [
      [
        lenguage == "Español" ? "Unidad" : "Unit",
        lenguage == "Español" ? "Nivel" : "Level",
        lenguage == "Español" ? "Tipo" : "Type",
        lenguage == "Español" ? "Baños" : "Bathroom",
        lenguage == "Español" ? "M2 Interior" : "Inside Area",
        lenguage == "Español" ? "Terraza" : "Terrace",
        lenguage == "Español" ? "M2 Total" : "Total M2",
        lenguage == "Español" ? "Precio de lista" : "List Price",
      ],
    ],

    body: body,
    theme: "plain",
    styles: {
      cellPadding: 4,
      //halign: "center",
      fontSize: 28,
      textColor: "#FFFFFF",
      font: "Lato-Regular",
    },
  });

  esquemaPagos(datos, lenguage);
}

var esquemaPagos = (datos, lenguage) => {
  doc.autoTable({
    body: [
      [
        {
          content:
            lenguage == "Español" ? "ESQUEMA DE PAGOS" : "PAYMENT SCHEMA",
          styles: {
            halign: "center",
            fontSize: 30,
            font: "Lato-Bold",
          },
        },
      ],
    ],
  });

  doc.autoTable({
    body: datos,
    theme: "plain",
    styles: {
      cellPadding: 4,
      //halign: "center",
      font: "Lato-Regular",
      fontSize: 28,
      textColor: "#FFFFFF",
    },
  });
};

var botttomLogo = (img) => doc.addImage(img, "PNG", 313.65, 327, 50, 29);
export default {
  start,
  end,
  text,
  graphicsFront,
  agent,
  photoShow,
  blueprints,
  EconomicProposal,
};
