var xhttp1 = new XMLHttpRequest();
var xhttp2 = new XMLHttpRequest();
var xhttp3 = new XMLHttpRequest();

var cat1 = new Map();
var cat2 = new Map();
var cat3 = new Map();
var cat4= new Map();

var lineCat1 = [];
var lineCat2 = [];
var lineCat3 = [];
var lineCat4 = [];

var total = 0;
var total1 = 0;
var total2 = 0;
var total3 = 0;
var total4 = 0;

var data, finished = 0;

xhttp1.onreadystatechange = function() {
  var category;
  var date;
  if (xhttp1.readyState==4 && xhttp1.status==200) {
    data = JSON.parse(xhttp1.responseText);
    for(var i = 0; i<data.length; i++){
      category = getCategory(data[i].cat);
      date = new Date(data[i].d).toISOString().slice(0,10);
      if(category === 'CAT 1'){
        updateGroups(date, data[i].value, cat1)
      }else if(category === 'CAT 2'){
        updateGroups(date, data[i].value, cat2)
      }else if(category === 'CAT 3'){
        updateGroups(date, data[i].value, cat3)
      }else if(category === 'CAT 4'){
        updateGroups(date, data[i].value, cat4)
      }
    }
    printCharts();
  }
};

xhttp2.onreadystatechange = function() {
  var category;
  if (xhttp2.readyState==4 && xhttp2.status==200) {
    data = JSON.parse(xhttp2.responseText);
    for(var i = 0; i<data.length; i++){
      category = getCategory(data[i].categ);
      if(category === 'CAT 1'){
      updateGroups(data[i].myDate, data[i].val, cat1)
      }else if(category === 'CAT 2'){
        updateGroups(data[i].myDate, data[i].val, cat2)
      }else if(category === 'CAT 3'){
        updateGroups(data[i].myDate, data[i].val, cat3)
      }else if(category === 'CAT 4'){
        updateGroups(data[i].myDate, data[i].value, cat4)
      }
    }
    printCharts();
  }
};

xhttp3.onreadystatechange = function() {
  var date;
  if (xhttp3.readyState==4 && xhttp3.status==200) {
    data = JSON.parse(xhttp3.responseText);
    for(var i = 0; i<data.length; i++){
      category = getCategory(data[i].raw);
      date = getDate(data[i].raw)
      if(category === 'CAT 1'){
      updateGroups(date, data[i].val, cat1)
      }else if(category === 'CAT 2'){
        updateGroups(date, data[i].val, cat2)
      }else if(category === 'CAT 3'){
        updateGroups(date, data[i].val, cat3)
      }else if(category === 'CAT 4'){
        updateGroups(date, data[i].value, cat4)
      }
    }
    printCharts();
  }
};

function getData(xhttp, source){
  xhttp.open('GET', source, true);
  xhttp.send();
}

function getDate(raw){
  var myReg = new RegExp("\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])");
  var date;
  if(myReg.test(raw)){
    date= myReg.exec(raw);
  }
  return date[0];
}

function getCategory(category){
  var myReg = new RegExp("\\b(C|c)(A|a)(T|t) [1-9][0-9]?\\b");
  var result;
  if(myReg.test(category)){
    result= myReg.exec(category);
  }
  return result[0].toUpperCase();
}

function updateGroups(date, value, categoryMap){
  if(!categoryMap.has(date)){
    categoryMap.set(date, value);
  }else{
    var actualValue = categoryMap.get(date);
    categoryMap.set(date, actualValue+value);
  }
}

function printCharts(){
  finished++;
  if(finished == 3){
    cat1 = new Map([...cat1.entries()].sort());
    cat2 = new Map([...cat2.entries()].sort());
    cat3 = new Map([...cat3.entries()].sort());


    cat1.forEach(function (value, key) {
      key = Date.parse(key);
      lineCat1.push({x: key.toString(), y:value});
      total1+=value;
    });

    cat2.forEach(function (value, key) {
      key = Date.parse(key);
      lineCat2.push({x: key.toString(), y:value});
      total2+=value;
    });

    cat3.forEach(function (value, key) {
      key = Date.parse(key);
      lineCat3.push({x: key.toString(), y:value});
      total3+=value;
    });

    cat4.forEach(function (value, key) {
      key = Date.parse(key);
      lineCat4.push({x: key.toString(), y:value});
      total4+=value;
    });

    lineChart.options.data[0].dataPoints = lineCat1;
    lineChart.options.data[1].dataPoints = lineCat2;
    lineChart.options.data[2].dataPoints = lineCat3;
    lineChart.options.data[3].dataPoints = lineCat4;

    total = total1+total2+total3+total4;
    total1=(total1/total)*100;
    total2=(total2/total)*100;
    total3=(total3/total)*100;
    total4=(total4/total)*100;

    //lineChart.render();

    var percentage1=0;

    finished = 0;
  }
}

var lineChart = new CanvasJS.Chart($("#chartContainer2"), {
	//theme: "light2", // "light1", "light2", "dark1", "dark2"
	animationEnabled: false,
	title:{
		text: "Title"
	},
	subtitles: [{
		text: "subtitle"
	}],
	axisX: {
    labelFormatter: function (e) {
				return CanvasJS.formatDate( e.value, "YYYY-MM-DD");
			},
		lineColor: "black",
		labelFontColor: "black"
	},
	axisY2: {
      	gridThickness: 0,
		title: "Value",
		titleFontColor: "black",
		labelFontColor: "black"
	},
	legend: {
		cursor: "pointer",
	},
	toolTip: {
		shared: true
	},
	data: [{
		type: "line",
		name: "CAT 1",
		markerSize: 5,
    axisYType: "secondary",
		showInLegend: true,
		dataPoints:[]
	},
  {
  type: "line",
  name: "CAT 2",
  markerSize: 5,
      axisYType: "secondary",
  showInLegend: true,
  dataPoints: []
},
{
type: "line",
name: "CAT 3",
markerSize: 5,
    axisYType: "secondary",
showInLegend: true,
dataPoints: []
},
{
type: "line",
name: "CAT 4",
markerSize: 5,
    axisYType: "secondary",
showInLegend: true,
dataPoints: []
}
]
});


getData(xhttp1, 'http://s3.amazonaws.com/logtrust-static/test/test/data1.json');
getData(xhttp2, 'http://s3.amazonaws.com/logtrust-static/test/test/data2.json');
getData(xhttp3, 'http://s3.amazonaws.com/logtrust-static/test/test/data3.json');
