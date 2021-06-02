var express = require('express');
var router = express.Router();
var mC = require("../Model/Clase");
var mH = require("../Model/horario");
const modelC = new mC()
const modelH = new mH();
let arD = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]


router.get("/",(req,res)=>{
  res.redirect("/H/R");
  }
);

router.get('/R/:x?', function (req, res) {
  let html = "<table class='table'> <th>Acción</th> <th></th> <th>Clase</th>  <th>Docente</th>  <th>Hora de inicio</th>  <th>Hora de fin</th>  <th>url</th>"
  var x = req.params.x;
  let dia = new Date ;
  let ho = dia.getHours() - 12, d2, c = '';
  let d = dia.getDay();

  if (x != undefined) {
    if (x > 6)
      x = 0;
    if (x < 0)
      x = 6;
    d = x;
  }
  console.log(x);
  var data = modelH.R(" WHERE idDia=" + d);
  if (data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      html += "<tr>";
      html+= "<td> <a href='/C/R/"+data[i].id+"'>Detalles</a></td>";
      html+= "<td>"+data[i].clase+"</td>";
      html+= "<td>"+data[i].prof+" "+data[i].mat+" "+data[i].pat+"</td>";
      html+= "<td>"+data[i].hi+":00 </td>";
      html+= "<td>"+data[i].hf+":00 </td>";
      if (dia.getDay() == d && ho >= data[i][i].hi && ho < data[i].hf)
        html+= "<td><a target='blank' class='red' href='"+data[i].url+"'>Enlace</a></td>";
      else
        html+= "<td><a target='blank' class='green' href='"+data[i].url+"'>Enlace</a></td>";
      html+="</tr>";
    }
    html += "</table>"
    res.render("horario/R", { dia: arD[d],html: html, xm: (parseInt(d) + 1).toString(), xl: (parseInt(d) - 1).toString(), d: d });
  }
  else {
    res.render("horario/R", { dia: arD[d],html:"", xm: (parseInt(d) + 1).toString(), xl: (parseInt(d) - 1).toString(), d: d });
  }
});

router.get('/V/:dia', function (req, res) {

  var cl = modelC.R();
  var h = modelH.R();
  if (h != undefined) {
    let html = "<table class='table'> <th>Acción</th><th>Clase</th>  <th>Docente</th>  <th>Hora de inicio</th>  <th>Hora de fin</th>  <th>url</th>"
    //mdifu
    var d = req.query.x;

    let arD = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

    for (let i = 0; i < h[d].length; i++) {
      for (let j = 0; j < cl.length; j++) {
        if (cl[j].id == h[d][i].id) {
          html += "<tr> <td>" +
            "<a href='/H/U?d=" + d + "&e=" + i + "' class='blue'>editar</a>" +
            "<a href='/H/D?d=" + d + "&e=" + i + "' class='red' >eliminar</a> " +
            "<td>" + " <td>" + cl[j].clase + "</td> <td>" + cl[j].prof + " " + cl[j].mat + " " + cl[j].pat + "</td> <td>" + h[d][i].hi + ":00</td> <td>" +
            h[d][i].hf + ":00</td> <td><a target='blank' class='green' href='" + cl[j].url + "'>Enlace</a></td>  </tr>";
        }
      }
    }

    html += "</table>"
    res.render("horario/RS", { dia: arD[d], html: html, xm: (parseInt(d) + 1).toString(), xl: (parseInt(d) - 1).toString(), d: d });
  }
  else {
    res.render("horario/RS", { dia: arD[d], html: "", xm: (parseInt(d) + 1).toString(), xl: (parseInt(d) - 1).toString(), d: d });

  }
});

router.get('/U', function (req, res) {
  let d = req.query.d, e = req.query.e, opc;

  var h = modelH.R();
  var cl = modelC.R();

  if (d != undefined && e != undefined) {
    for (let i = 0; i < cl.length; i++) {
      if (h[d][e].id == cl[i].id)
        opc += "<option selected value=" + cl[i].id + ">" + cl[i].clase + "</option>";
      else
        opc += "<option value=" + cl[i].id + ">" + cl[i].clase + "</option>";
    }
    res.render("horario/U", { opc: opc, diaS: arD[d], dia: d, entrada: (e + 1), hi: h[d][e].hi, hf: h[d][e].hf });
  } else {
    res.render("msg", { msg: "Error 404", des: "pagina no encontrada", lnk: "/H", lnkD: "Volver" })
  }
});

router.get('/C', function (req, res) {
  let cl = modelC.R();
  let opc = '';
  let d = req.query.x;
  if (d != undefined) {
    for (let i = 0; i < cl.length; i++) {
      opc += "<option value=" + cl[i].id + ">" + cl[i].clase + "</option>";
    }
    res.render("horario/C", { opc: opc, diaS: arD[d], dia: d });
  }
  else
    res.render("msg", { msg: "Error 404", des: "pagina no encontrada", lnk: "/H", lnkD: "Volver" })
});

router.get('/D', async (req, res) => {
  let { e } = req.query;

  if (e != undefined) {
    let data = await modelH.R(e);
    let table = "<table><tr><th>Clase</th><th>Hora de inicio</th><th>Hora de termino</th><th>Dia</th></tr><tr>";
    if (data.length > 0) {
      table += "<td>" + data[0].clase + "</td>";
      table += "<td>" + data[0].hi + "</td>";
      table += "<td>" + data[0].hf + "</td>";
      table += "<td>" + data[0].dia + "</td>";
      table += "</tr></table>"
      res.render("horario/D", { table, e });
    }
    else
      res.render("msg", { msg: "Error 404", des: "pagina no encontrada", lnk: "/H", lnkD: "Volver" });

  }
  else
    res.render("msg", { msg: "Error 404", des: "pagina no encontrada", lnk: "/H", lnkD: "Volver" });
});

/// POST

router.post('/C', (req, res) => {
  let { dia, clase, hi, hf } = req.body;
  if (modelH.C(dia, clase, hi, hf))
    res.render("msg", { msg: "Exito", des: "entrada añadida exitosamente", lnk: "/H", lnkD: "Volver" })
  else
    res.render("msg", { msg: "Error 503", des: "Ha ocurrido un error interno", lnk: "/H", lnkD: "Volver" })
});

router.post('/U', (req, res) => {
  let { dia, entrada, clase, hi, hf } = req.body;
  entrada -= 1;
  if (modelH.U(dia, entrada, clase, hi, hf))
    res.render("msg", { msg: "Exito", des: "entrada añadida exitosamente", lnk: "/H", lnkD: "Volver" })
  else
    res.render("msg", { msg: "Error 503", des: "Ha ocurrido un error interno", lnk: "/H", lnkD: "Volver" })
});

router.post('/D', (req, res) => {
  if (modelH.D(req.body.e))
    res.render("msg", { msg: "Exito", des: "entrada eliminada exitosamente", lnk: "/H", lnkD: "Volver" })
  else
    res.render("msg", { msg: "Error 503", des: "Ha ocurrido un error interno", lnk: "/H", lnkD: "Volver" })
});

module.exports = router;
