(function(){

var currentGroup = "GP";
var currentPage = '1';
var tablesArray = [];

var actividadesArray = [];
var tareasArray = [];
var subtareasArray = [];
var detailedDescBoxes = [];
var detailedDescImgs = [];
var imageUrlsArray = [];

function Table() {
  this.nombreFase = "";
  this.descripcionFase = "";
  this.controlarItems = [];
  this.modelarItems = [];
  this.nohacerItems = [];
  this.soportar = {documentos: [],tecnologia : []};
  this.descripcionDetallada = [];

}


var setButtons = function(groupName) {
  switch(groupName) {
    case "GP":
      document.getElementById("group1").src="img/GP.png";
      break;
    case "PN":
      document.getElementById("group2").src="img/PN.png";
      break;
    case "CT":
      document.getElementById("group3").src="img/CT.png";
      break;
    case "GC":
      document.getElementById("group4").src="img/GC.png";
      break;
  }
};


var setPage = function(pageNumber) {
    
    currentPage = pageNumber;
};

var loadPage = function() {
  showData();
};

var loadData = function() {
  var myFirebaseRef = new Firebase("https://villamizare.firebaseio.com/");
        
    myFirebaseRef.child("tablas").on("value", function(snapshot) {
      snapshot.forEach(function(table) {
          var t = new Table();
          var controlar = table.child("controlar").val();
          t.nombreFase = table.child("nombreFase").val();
          t.descripcionFase = table.child("descripcionFase").val();

          //alert(t.nombreFase)
          //alert(table.child("nombreFase").val());
          controlar.forEach(function(controlarItem) {
            t.controlarItems.push(controlarItem);
            //alert(controlarItem)
          });
         var modelar = table.child("modelar").val();
          modelar.forEach(function(modelarItem) {
            t.modelarItems.push(modelarItem);
            //alert(modelarItem)
          });
          var soportarDocs = table.child("soportar/documentos").val();
          soportarDocs.forEach(function(soportarDocsItem) {
            t.soportar.documentos.push(soportarDocsItem);
            //alert(soportarDocsItem)
          });
          var soportarTec = table.child("soportar/tecnologia").val();
          soportarTec.forEach(function(soportarTecItem) {
            t.soportar.tecnologia.push(soportarTecItem);
            //alert(soportarTecItem)
          });
          var noHacer = table.child("nohacer").val();
          noHacer.forEach(function(noHacerItem) {
            t.nohacerItems.push(noHacerItem);
            //alert(noHacerItem)
          });

          var descripcionDetallada = table.child("descripcionDetallada");
          descripcionDetallada.forEach(function(descripcionDetalladaItem) {
            var nombreEquipo = descripcionDetalladaItem.child("equipo").val();
            //t.descripcionDetallada.push({equipo: nombreEquipo});
            //alert(nombreEquipo)
            var descripcionDetalladaItemActivities = descripcionDetalladaItem.child("actividades");
            actividadesArray = [];
            descripcionDetalladaItemActivities.forEach(function(activity) {
                
                var nombreAc = activity.child("nombreActividad").val();
                var tareas = activity.child("tareas");
                tareasArray = [];
                tareas.forEach(function(tarea) {
                    var nombreT = tarea.child("nombreTarea").val();
                    tareasArray.push(nombreT);
                  });

                if ( activity.child("entradas").val() != "no" ) { 
                  var entradas = activity.child("entradas").val();
                  var entradasArray = [];
                  entradas.forEach(function(entrada){
                  
                    entradasArray.push(entrada);
                  });
                }


                if ( activity.child("salidas").val() != "no" ) { 
                  var salidas = activity.child("salidas").val();
                  var salidasArray = [];
                  salidas.forEach(function(salida){
                  
                    salidasArray.push(salida);
                  });
                }


                
                actividadesArray.push({nombreActividad:nombreAc,tareas:tareasArray,entradas:entradasArray,salidas:salidasArray});
                
                
            });
            t.descripcionDetallada.push({equipo:nombreEquipo,actividades:actividadesArray});

          });
      
      tablesArray.push(t);

      });
    showData();
    });
};

var urlParam = function(name, w){
    w = w || window;
    var rx = new RegExp('[\&|\?]'+name+'=([^\&\#]+)'),
        val = w.location.search.match(rx);
    return !val ? '':val[1];
};

var showData = function() {
  var pageIndex = currentPage - 1;
   
  var table = tablesArray[pageIndex];

  var buttons = document.querySelectorAll(".navigationButton");

  for (var y = 0 ; y < buttons.length ; y++) {
    var button = buttons[y];
    button.src = "img/f"+(y+1)+".png";
   // alert("img/f"+(y+1)+".png");
  } 

  document.getElementById("button"+currentPage).src = "img/f"+currentPage+"1.png";

  var title = document.getElementById("sectionTitle");
  title.innerHTML = table.nombreFase;
  var phaseDescription = document.getElementById("phaseDescription");
  phaseDescription.innerHTML = table.descripcionFase;
  
  var docsList = document.getElementById("tableDocsList");
  var docsArray = table.soportar.documentos;
  var tecArray = table.soportar.tecnologia;
  var docsText = "<b>Documentos:</b> <br>";
  for (var i = 0 ; i < docsArray.length ; i ++) {
      var doc = docsArray[i];
      docsText = docsText.concat("&nbsp;&bull; ");
      docsText = docsText.concat(doc);
      docsText = docsText.concat("<br>");
      //alert(docsText);
  }
  docsText = docsText.concat("<b>Tecnología:</b> <br>");
  for (var i = 0 ; i < tecArray.length ; i ++) {
      var doc = tecArray[i];
      docsText = docsText.concat("&nbsp;&bull; ");
      docsText = docsText.concat(doc);
      docsText = docsText.concat("<br>");
      //alert(docsText);
  }
  docsList.innerHTML = docsText;
 
  var modelarList = document.getElementById("modelarList");
  var modelarArray = table.modelarItems;
  var modelarText = "";
  for (var i = 0 ; i < modelarArray.length ; i ++) {
      var modelar = modelarArray[i];
      modelarText = modelarText.concat("&nbsp;&bull; ");
      modelarText = modelarText.concat(modelar);
      modelarText = modelarText.concat("<br>");
      //alert(docsText);
  }
  modelarList.innerHTML = modelarText;

  var controlarList = document.getElementById("controlarList");
  var controlarArray = table.controlarItems;
  var controlarText = "";
  for (var i = 0 ; i < controlarArray.length ; i ++) {
      var controlar = controlarArray[i];
      controlarText = controlarText.concat("&nbsp;&bull; ");
      controlarText = controlarText.concat(controlar);
      controlarText = controlarText.concat("<br>");
      //alert(docsText);
  }
  controlarList.innerHTML = controlarText;

  var nohacerList = document.getElementById("nohacerList");
  var nohacerArray = table.nohacerItems;
  var nohacerText = "";
  for (var i = 0 ; i < nohacerArray.length ; i ++) {
      var nohacer = nohacerArray[i];
      nohacerText = nohacerText.concat("&nbsp;&bull; ");
      nohacerText = nohacerText.concat(nohacer);
      nohacerText = nohacerText.concat("<br>");
      //alert(docsText);
  }
  nohacerList.innerHTML = nohacerText;

  loadTeam();
  //loadInputsAndOutputs();
  


};


var loadTeam = function() {

  var ddTable = document.getElementById("detailedDescTable");
  ddTable.innerHTML = "";
  var ioTable = document.getElementById("ioTable");
  ioTable.innerHTML = "";
  //this.descripcionDetallada = [{equipo: "",actividades: [{nombreActividad: "",tareas:[{nombreTarea: "",subtareas: []}]}]}];
  var pageIndex = currentPage - 1;
  var table = tablesArray[pageIndex];

  var boxesContainer = document.getElementById("boxesContainer");
  currentGroup = urlParam("groupName");
  var descDetalladaText = "";
  var descDetalladaBoxes = "";
  detailedDescBoxes = [];
  //alert(table.descripcionDetallada.length)
  for (var a = 0 ; a < table.descripcionDetallada.length ; a++) {
        var dd = table.descripcionDetallada[a];
        if(currentGroup == dd.equipo) { // alert(currentGroup)
          for (var b = 0 ; b < dd.actividades.length ; b++) {//alert("actividad")
            var actObj = dd.actividades[b];
               detailedDescBoxes.push({nombreActividad:actObj.nombreActividad,url: actObj.url});
               descDetalladaBoxes = descDetalladaBoxes.concat("<div class=\"DDBox\" id=\""+actObj.nombreActividad+"\"><p class=\"boxText\">");
               descDetalladaBoxes = descDetalladaBoxes.concat(actObj.nombreActividad);
               descDetalladaBoxes = descDetalladaBoxes.concat("</p>");

              descDetalladaBoxes = descDetalladaBoxes.concat("</div>");
          }
          
        }
  }
  if (detailedDescBoxes.length === 0) {
    document.getElementById("descDetalladaLbl").innerHTML = "";
  }
  else {
    document.getElementById("descDetalladaLbl").innerHTML = "Descripción detallada";
  }
  boxesContainer.innerHTML = descDetalladaBoxes;

  for (var a = 0 ; a < detailedDescBoxes.length ; a++) {
    var actObj = detailedDescBoxes[a];
    document.getElementById(actObj.nombreActividad).addEventListener("click", loadTable,false);
    
  }

};
 

function loadTable(e){ 
     if (!e)
        e = window.event;
    var sender = e.srcElement || e.target;

    while (sender && sender.nodeName.toLowerCase() != "div")
        sender = sender.parentNode;

     var myId = sender.id;

     var boxes = document.querySelectorAll(".DDBox");

     for (var x = 0 ; x < boxes.length ; x++) {
        boxes[x].classList.remove("DDSelectedBox");
     }

     document.getElementById(myId).classList.add("DDSelectedBox");
     var descDetalladaText = "";
     var ioText = "";
     var pageIndex = currentPage - 1;
     var table = tablesArray[pageIndex];
     var ddTable = document.getElementById("detailedDescTable");
     var ioTable = document.getElementById("ioTable");
     for (var a = 0 ; a < table.descripcionDetallada.length ; a++) {
        var dd = table.descripcionDetallada[a];
        if(currentGroup == dd.equipo) {  
          for (var b = 0 ; b < dd.actividades.length ; b++) {
            var actObj = dd.actividades[b];
            if(actObj.nombreActividad == myId) {
              descDetalladaText = descDetalladaText.concat("<tr>");
              descDetalladaText = descDetalladaText.concat("<td>");
              
              for(var c = 0 ; c < actObj.tareas.length ; c++) {
                  var tarea = actObj.tareas[c];

                  if(tarea.substring(0, 4) != "http") { 
                    descDetalladaText = descDetalladaText.concat("&bull;");
                    descDetalladaText = descDetalladaText.concat(tarea);
                    descDetalladaText = descDetalladaText.concat("<br>");
                  } else { 
                    descDetalladaText = descDetalladaText.concat("<img class=\"ddImage\" src=\"");
                    descDetalladaText = descDetalladaText.concat(tarea);
                    descDetalladaText = descDetalladaText.concat("\" />");
                    descDetalladaText = descDetalladaText.concat("<br>");
                  }

              }

              descDetalladaText = descDetalladaText.concat("</td>");
              descDetalladaText = descDetalladaText.concat("</tr>");
              if( actObj.entradas != undefined && actObj.entradas.length > 0) { 
              ioText = ioText.concat("<tr><th class=\"inputsoutputs\">Entradas</th>");
              ioText = ioText.concat("<th class=\"inputsoutputs\">Salidas</th></tr>");
              ioText = ioText.concat("<tr><td>");
              for (var d = 0 ; d < actObj.entradas.length; d++) {
                var entrada = actObj.entradas[d];
                ioText = ioText.concat("&bull;");
                ioText = ioText.concat(entrada);
                ioText = ioText.concat("<br>");
              }  
              
              ioText = ioText.concat("</td>"); 
              ioText = ioText.concat("<td>");
              for (var e = 0 ; e < actObj.salidas.length; e++) {
                var salida = actObj.salidas[e];
                ioText = ioText.concat("&bull;");
                ioText = ioText.concat(salida);
                ioText = ioText.concat("<br>");
              }  

              ioText = ioText.concat("</td></tr>"); 
              } 
              
            }
          }
        }


     }
     ddTable.innerHTML = descDetalladaText;
     ioTable.innerHTML = ioText;
}


window.onload = function() {
  currentGroup = urlParam("groupName");
  setButtons(urlParam("groupName"));
  loadData();
  
};


document.querySelector('#button1').addEventListener('click', function() {
     setPage('1');
     loadPage();
  }, false);

document.querySelector('#button2').addEventListener('click', function() {
     setPage('2');
     loadPage();
  }, false);

document.querySelector('#button3').addEventListener('click', function() {
     setPage('3');
     loadPage();
  }, false);

document.querySelector('#button4').addEventListener('click', function() {
     setPage('4');
     loadPage();
  }, false);

document.querySelector('#button5').addEventListener('click', function() {
     setPage('5');
     loadPage();
  }, false);

document.querySelector('#button6').addEventListener('click', function() {
     setPage('6');
     loadPage();
  }, false);

document.querySelector('#button7').addEventListener('click', function() {
     setPage('7');
     loadPage();
  }, false);

document.querySelector('#button8').addEventListener('click', function() {
     setPage('8');
     loadPage();
  }, false);

document.querySelector('#button9').addEventListener('click', function() {
     setPage('9');
     loadPage();
  }, false);

document.querySelector('#button10').addEventListener('click', function() {
     setPage('10');
     loadPage();
  }, false);


})();  