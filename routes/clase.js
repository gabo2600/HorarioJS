var express = require('express');
const { NotImplemented } = require('http-errors');
var router = express.Router();
var model = require("../Model/Clase");

/* GET users listing. */

router.get("/", (req,res)=>{
  var data = require("../DB/clases.json");
  let html="<table> ";

  for(let i = 0 ;i<data.length ; i++)
  {
    html+= "<tr> <td><a href='/C/R?id="+data[i].id+"'>detalles de la clase</a><td> <td>"+data[i].clase+"</td> <td>"+data[i].prof+" "+data[i].mat+" "+data[i].pat+"</td> <td><a target='blank' class='green' href='"+data[i].url+"'>Enlace</a></td>  </tr>";
  }
  html+="</table>";
  res.render("clases/index",{html:html});
});


router.get('/R', function(req, res, next) {
  let id = req.query.id;
  if (id!=undefined)
  {
    var data = require("../DB/clases.json");
    //data = JSON.parse(data);
    console.log(data);
    if (data.length>=id)
      res.render("clases/R",{clase:data[id].clase,prof:data[id].prof,mat:data[id].mat,pat:data[id].pat,url:data[id].url,id:id});
    else
    res.render("msg",{msg:"Error 404",des:"pagina no encontrada",lnk:"/",lnkD:"Volver"})
  }
  else
  {
    res.render("msg",{msg:"Error 404",des:"pagina no encontrada",lnk:"/",lnkD:"Volver"})
  }
});


router.get('/C', function(req, res, next) {
  res.render("clases/C");
});

router.get('/U', function(req, res, next) {
  let id = req.query.id;
  if (id!=undefined)
  {
    var data = require("../DB/clases.json");
    //data = JSON.parse(data);
    console.log(data);
    if (data.length>=id)
      res.render("clases/R",{clase:data[id].clase,prof:data[id].prof,mat:data[id].mat,pat:data[id].pat,url:data[id].url,id:id});
    else
    res.render("msg",{msg:"Error 404",des:"pagina no encontrada",lnk:"/",lnkD:"Volver"})
  }
  else
  {
    res.render("msg",{msg:"Error 404",des:"pagina no encontrada",lnk:"/",lnkD:"Volver"})
  }
  res.render("clases/U");
});

router.get('/D', function(req, res, next) {
  res.render("msg",{msg:"Exito",des:"clase eliminada exitosamente",lnk:"/",lnkD:"Volver"})

});

//post

router.post('/C', function(req, res, next) {
  const prof = req.body.nom;
  const clase = req.body.nomC;
  const pat = req.body.pat;
  const mat = req.body.mat;
  const url = req.body.url;
  
  model.C(clase,prof,pat,mat,url);
  res.render("msg",{msg:"Exito",des:"clase guardada exitosamente",lnk:"/C/R",lnkD:"Volver"})
});

router.post('/U', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/D', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;
