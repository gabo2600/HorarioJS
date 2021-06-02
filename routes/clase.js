const express = require('express');
const router = express.Router();
const m = require("../Model/Clase");
const model = new m();

router.get("/",(req,res)=>{
  res.redirect("/C/R");
  }
);

router.get("/R", (req, res) => {
  var data = model.R();
  let html = "<table> ";
  for (let i = 0; i < data.length; i++) {
    html += "<tr> <td><a href='/C/R?id=" + data[i].id + "'>detalles de la clase</a><td> <td>" + data[i].clase + "</td> <td>" + data[i].prof + " " + data[i].mat + " " + data[i].pat + "</td> <td><a target='blank' class='green' href='" + data[i].url + "'>Enlace</a></td>  </tr>";
  }
  html += "</table>";
  res.render("clases/index", { html: html });
});

router.get('/R/:id', function (req, res) {
  console.log(req.params.id);
  var data = model.R(req.params.id);
  if (data != undefined)
    res.render("clases/R", {
      clase: data[0].clase,
      prof: data[0].prof,
      mat: data[0].mat,
      pat: data[0].pat,
      url: data[0].url,
      id: id
    });
  res.render("msg", { msg: "Error 404", des: "pagina no encontrada", lnk: "/H", lnkD: "Volver" })
});



router.get('/C', function (req, res, next) {
  res.render("clases/C");
});

router.get('/U/:id', function (req, res, next) {
  var data = model.R(req.params.id);
  if (data != undefined)
    res.render("clases/U", {
      nomC: data[0].clase,
      nom: data[0].prof,
      mat: data[0].mat,
      pat: data[0].pat,
      url: data[0].url,
      id: id
    });
  else
    res.render("msg", { msg: "Error 404", des: "pagina no encontrada", lnk: "/H", lnkD: "Volver" })
});


router.get('/D/:id', function (req, res, next) {
  let id = req.params.id;
  let encontrada = false;
  var data = model.R();
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == id) {
      res.render("clases/D", { clase: data[i].clase, id: id });
      encontrada = true;
    }
  }
  if (!encontrada)
    res.render("msg", { msg: "Error 404", des: "pagina no encontrada", lnk: "/H", lnkD: "Volver" })

});



//post


router.post('/C', function (req, res, next) {
  const prof = req.body.nom;
  const clase = req.body.nomC;
  const pat = req.body.pat;
  const mat = req.body.mat;
  const url = req.body.url;
  if (model.C(clase, prof, pat, mat, url))
    res.render("msg", { msg: "Exito", des: "clase guardada exitosamente", lnk: "/C/C", lnkD: "Volver" });
  else
    res.render("msg", { msg: "Error 503", des: "Ha ocurrido un error interno", lnk: "/H", lnkD: "Volver" })
});


router.post('/U', function (req, res, next) {
  let nomC = req.body.nomC;
  let nom = req.body.nom;
  let pat = req.body.mat;
  let mat = req.body.pat;
  let url = req.body.url;
  let id = req.body.id;
  if (model.U(nomC, nom, pat, mat, url, id))
    res.render("msg", { msg: "Exito", des: "clase guardada exitosamente", lnk: "/C/R/" + id, lnkD: "Volver" })
  else
    res.render("msg", { msg: "Error 503", des: "Ha ocurrido un error interno", lnk: "/H", lnkD: "Volver" })
});


router.post('/D', function (req, res, next) {
  id = req.body.id;
  if (model.D(id))
    res.render("msg", { msg: "Exito", des: "Clase eliminada exitosamente", lnk: "/H", lnkD: "Volver" });
  else
    res.render("msg", { msg: "Error 503", des: "Ha ocurrido un error interno", lnk: "/H", lnkD: "Volver" })
});

module.exports = router;
