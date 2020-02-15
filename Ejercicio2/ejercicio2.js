var xhttp1 = new XMLHttpRequest();
var xhttp2 = new XMLHttpRequest();
var xhttp3 = new XMLHttpRequest();
var ruben;
var data;
var cat1 = new Map();
var cat2 = new Map();
var cat3 = new Map();
var cat4= new Map();


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

getData(xhttp1, 'http://s3.amazonaws.com/logtrust-static/test/test/data1.json');
getData(xhttp2, 'http://s3.amazonaws.com/logtrust-static/test/test/data2.json');
getData(xhttp3, 'http://s3.amazonaws.com/logtrust-static/test/test/data3.json');
