var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {

  var cl = require("../DB/clases.json");
  var h = require("../DB/horario.json");
  let html = "<table> <th>Acción</th><th>Clase</th>  <th>Docente</th>  <th>Hora de inicio</th>  <th>Hora de fin</th>  <th>url</th>"
  //mdifu
  var x = req.query.x;

  let d = new Date,arD = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"],dia;
  d = d.getDay();
  d = d-1;
  if (x!=undefined)
  {
    if (x>6)
      x=0;
    if (x<0)
      x=6;
    d=x;
  }
  else
    x=d;

  dia = arD[d];

  for(let i = 0 ;i< h[d].length ; i++)
  {
    html+= "<tr> <td><a href='/C/R?id="+h[d][i].id+"'>detalles de la clase</a><td> <td>"+cl[h[d][i].id].clase+"</td> <td>"+cl[h[d][i].id].prof+" "+cl[h[d][i].id].mat+" "+cl[h[d][i].id].pat+"</td> <td>"+h[d][i].hi+":00</td> <td>"+
    h[d][i].hf+":00</td> <td><a target='blank' class='green' href='"+cl[h[d][i].id].url+"'>Enlace</a></td>  </tr>";
  }

  html+= "</table>"
  res.render("horario/R",{dia:dia,html:html,xm:(parseInt(x)+1).toString(),xl:(parseInt(x)-1).toString()});

});

module.exports = router;
