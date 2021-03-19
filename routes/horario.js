var express = require('express');
var router = express.Router();
var modelC = require("../Model/Clase");
var modelH = require("../Model/horario");
/* GET home page. */
let arD = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"]

router.get('/', function(req, res) {

  var cl = modelC.R();
  var h = modelH.R();
  if (h!=undefined){
    let html = "<table class='table'> <th>Acción</th> <th></th> <th>Clase</th>  <th>Docente</th>  <th>Hora de inicio</th>  <th>Hora de fin</th>  <th>url</th>"
    //mdifu
    var x = req.query.x;

    let d = new Date,dia;
    let ho = d.getHours()-12,d2,c='';

    d = d.getDay();
    d = d-1;
    d2 =d;
    if (x!=undefined)
    {
      if (x>6)
        x=0;
      if (x<0)
        x=6;
      d=x;
    }

    for(let i = 0 ;i< h[d].length ; i++)
    {
      for (let j = 0 ; j< cl.length; j++){
        if (cl[j].id == h[d][i].id)
        {
          if ((x==undefined || x==d2) && ho>=h[d][i].hi && ho<h[d][i].hf)  
            html+= "<tr> <td><a href='/C/R?id="+h[d][i].id+"'>detalles</a><td><td>"+cl[j].clase+"</td> <td>"+cl[j].prof+" "+cl[j].mat+" "+cl[j].pat+"</td> <td>"+h[d][i].hi+":00</td> <td>"+
            h[d][i].hf+":00</td> <td><a target='blank' class='red' href='"+cl[j].url+"'>Enlace</a></td>  </tr>";
          else
            html+= "<tr> <td><a href='/C/R?id="+h[d][i].id+"'>detalles</a><td> <td>"+cl[j].clase+"</td> <td>"+cl[j].prof+" "+cl[j].mat+" "+cl[j].pat+"</td> <td>"+h[d][i].hi+":00</td> <td>"+
            h[d][i].hf+":00</td> <td><a target='blank' class='green' href='"+cl[j].url+"'>Enlace</a></td>  </tr>";
        }
      }
    }

    html+= "</table>"
    res.render("horario/R",{dia:arD[d],html:html,xm:(parseInt(d)+1).toString(),xl:(parseInt(d)-1).toString(),d:d});
  }
  else
  {
    res.redirect("/");
  }
});

router.get('/H/R', function(req, res) {

  var cl = modelC.R();
  var h = modelH.R();
  if (h!=undefined){
    let html = "<table class='table'> <th>Acción</th><th>Clase</th>  <th>Docente</th>  <th>Hora de inicio</th>  <th>Hora de fin</th>  <th>url</th>"
    //mdifu
    var d = req.query.x;

    let arD = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"];

    for(let i = 0 ;i< h[d].length ; i++)
    {
      for (let j = 0 ; j< cl.length; j++){
        if (cl[j].id == h[d][i].id)
        { 
            html+= "<tr> <td>"+
              "<a href='/H/U?d="+d+"&e="+i+"' class='blue'>editar</a>"+
              "<a href='/H/D?d="+d+"&e="+i+"' class='red' >eliminar</a> "+
              "<td>"+" <td>"+cl[j].clase+"</td> <td>"+cl[j].prof+" "+cl[j].mat+" "+cl[j].pat+"</td> <td>"+h[d][i].hi+":00</td> <td>"+
            h[d][i].hf+":00</td> <td><a target='blank' class='green' href='"+cl[j].url+"'>Enlace</a></td>  </tr>";
        }
      }
    }

    html+= "</table>"
    res.render("horario/RS",{dia:arD[d],html:html,xm:(parseInt(d)+1).toString(),xl:(parseInt(d)-1).toString(),d:d});
  }
  else
  {
    res.redirect("/");
  }
});


/*
entrada
diaS
dia
opc
hi
hf
*/

router.get('/H/U', function(req, res) {
  let d = req.query.d,e = req.query.e, opc;

  var h = modelH.R();
  var cl = modelC.R();

  if (d!=undefined && e != undefined){
    for(let i = 0 ;i<cl.length ; i++)
    {
      if (h[d][e].id == cl[i].id)
        opc+="<option selected value="+cl[i].id+">"+cl[i].clase+"</option>";
      else
        opc+="<option value="+cl[i].id+">"+cl[i].clase+"</option>";
    }
    res.render("horario/U",{opc:opc,diaS:arD[d],dia:d,entrada:(e+1), hi:h[d][e].hi , hf:h[d][e].hf });
  }else
  {
    res.render("msg",{msg:"Error 404",des:"pagina no encontrada",lnk:"/",lnkD:"Volver"})
  }
});

router.get('/H/C', function(req, res) {
  let cl = modelC.R();
  let opc='';
  let d = req.query.x;
  if (d!=undefined){
    for(let i = 0 ;i<cl.length ; i++)
    {
      opc+="<option value="+cl[i].id+">"+cl[i].clase+"</option>";
    }
    res.render("horario/C",{opc:opc,diaS:arD[d],dia:d});
  }
  else
    res.render("msg",{msg:"Error 404",des:"pagina no encontrada",lnk:"/",lnkD:"Volver"})

  
});

router.get('/H/D', function(req, res) {
  let {d,e} = req.query;

  if (e!=undefined && d!=undefined)
  {
    res.render("horario/D",{d:d,e:e});
  }
  else
    res.render("msg",{msg:"Error 404",des:"pagina no encontrada",lnk:"/",lnkD:"Volver"})
});

/// POST

router.post('/H/C',(req,res)=>{
  let {dia,clase,hi,hf} = req.body;
  modelH.C(dia,clase,hi,hf);
  res.render("msg",{msg:"Exito",des:"entrada añadida exitosamente",lnk:"/",lnkD:"Volver"})

});

router.post('/H/U',(req,res)=>{
  let {dia,entrada,clase,hi,hf} = req.body;
  entrada-=1;
  modelH.U(dia,entrada,clase,hi,hf);
  res.render("msg",{msg:"Exito",des:"entrada añadida exitosamente",lnk:"/",lnkD:"Volver"})

});

router.post('/H/D',(req,res)=>{
  let {d,e} = req.body;
  modelH.D(d,e);
  res.render("msg",{msg:"Exito",des:"entrada eliminada exitosamente",lnk:"/",lnkD:"Volver"})

});

module.exports = router;
