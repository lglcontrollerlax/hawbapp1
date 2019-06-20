function onOpen(e){
  SpreadsheetApp.getUi()
  .createMenu('Hawb App')
  .addItem('Hawb App','getSheetData')
  //.addSeparator()
  //.addItem('fun 3','fun3')
  .addToUi();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}


function getSheetData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var val = sheet.getDataRange().getValues();
 // reformat dates on sheet into data
  for(x=1;x<val.length;x++){

    if(val[x][0] != ""){
      dateRtrn= Utilities.formatDate(val[x][0], "GMT", "MM/dd/yyyy")
      val[x][0] = dateRtrn;
    }
    if(val[x][21] != ""){
     dateRtrn= Utilities.formatDate(val[x][21], "GMT", "MM/dd/yyyy")
     val[x][21] = dateRtrn;
    }
    if(val[x][22] != ""){
     dateRtrn= Utilities.formatDate(val[x][22], "GMT", "MM/dd/yyyy")
     val[x][22] = dateRtrn;
    }
    if(val[x][25] != ""){
     dateRtrn= Utilities.formatDate(val[x][25], "GMT", "MM/dd/yyyy")
     val[x][25] = dateRtrn;
    }
  }
  var sheetTeam = ss.getSheetByName("LaxTeamSheet")
  var valTeam = sheetTeam.getDataRange().getValues();
  var sheetInHouse = ss.getSheetByName("In House Sheet")
  var valInHouse = sheetInHouse.getDataRange().getValues();
  var dataObj = {hawb:val, sheetTeam:valTeam, sheetInHouse:valInHouse }
  var t = HtmlService.createTemplateFromFile('hawb1');
  // send data over into ui when html opens
  t.data = dataObj
  var html = t.evaluate();
  SpreadsheetApp.getUi().showSidebar(html)
}

function openHawbEntry(hawbData) {
  // open the modal hawbEntry and send the hawb data in
  //Logger.log(hawbDataZip)
  var title = 'Hawb to Create Entry: ' + hawbData.hawb.toString().toUpperCase();

    var t = HtmlService.createTemplateFromFile('hawbEntry');
  // send data over into ui when html opens
    t.data = hawbData;
  var html = t.evaluate().setWidth(900).setHeight(850);
  SpreadsheetApp.getUi().showModalDialog(html, title) ;
  return 'Opened';
}

function openHawbUpdate(hawbRowIndex) {
  // open the modal hawbEntry and send the hawb data in
  //Logger.log(hawbRowIndex)
  var title = 'Hawb to Update: ' + hawbRowIndex.hawb[0][3].toString().toUpperCase();

    var t = HtmlService.createTemplateFromFile('hawbUpdate');
  // send data over into ui when html opens
    t.data = hawbRowIndex;
  var html = t.evaluate().setWidth(900).setHeight(850);
  SpreadsheetApp.getUi().showModalDialog(html, title) ;
  return 'Opened';
}

function getHawbValues() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var val = sheet.getDataRange().getValues();
  for(x=1;x<val.length;x++){
    Logger.log(val[x][21])
    if(val[x][0] != ""){
      dateRtrn= Utilities.formatDate(val[x][0], "GMT", "MM/dd/yyyy")
      Logger.log(dateRtrn)
      val[x][0] = dateRtrn;
    }
    if(val[x][21] != ""){
      dateRtrn= Utilities.formatDate(val[x][21], "GMT", "MM/dd/yyyy")
      Logger.log(dateRtrn)
      val[x][21] = dateRtrn;
    }
        if(val[x][22] != ""){
      dateRtrn= Utilities.formatDate(val[x][22], "GMT", "MM/dd/yyyy")
      val[x][22] = dateRtrn;
    }
    if(val[x][25] != ""){
      dateRtrn= Utilities.formatDate(val[x][25], "GMT", "MM/dd/yyyy")
      val[x][25] = dateRtrn;
    }
  }
  return JSON.stringify(val);
}

function updateSheet(rowData, row) {

  // take rowdata and row number and append to spreadsheet last row
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  if(Math.abs(row) == 0){
    sheet.appendRow(rowData);
  }else {
    for(i=1;i<= rowData.length;i++) {
      if(rowData[i-1] !=""){
        var cell = sheet.getRange(row,i);
        if(rowData[i-1] =="Delete"){
          cell.setValue("");
        }else {
          cell.setValue(rowData[i-1]);
        }
      }
     }
    return "updated";
  }
}

function getInHouse() {
    // get inhouse sheet cost data and send over in object array
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetInHouse = ss.getSheetByName("In House Sheet")
  var valInHouse = sheetInHouse.getDataRange().getValues();

  return JSON.stringify(valInHouse);
}

function getTeam() {
    // get inhouse sheet cost data and send over in object array
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetTeam = ss.getSheetByName("In House Sheet")
  var valTeam = sheetTeam.getDataRange().getValues();

  return JSON.stringify(valTeam);
}

function storeHawb() {
  // Store 500 hawb at a time to shorten the spreadsheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var val = sheet.getDataRange().getValues();
 // reformat dates on sheet into data
  for(x=1;x<val.length;x++){

    if(val[x][0] != ""){
      dateRtrn= Utilities.formatDate(val[x][0], "GMT", "MM/dd/yyyy")
      val[x][0] = dateRtrn;
    }
    if(val[x][21] != ""){
     dateRtrn= Utilities.formatDate(val[x][21], "GMT", "MM/dd/yyyy")
     val[x][21] = dateRtrn;
    }
    if(val[x][22] != ""){
     dateRtrn= Utilities.formatDate(val[x][22], "GMT", "MM/dd/yyyy")
     val[x][22] = dateRtrn;
    }
    if(val[x][25] != ""){
     dateRtrn= Utilities.formatDate(val[x][25], "GMT", "MM/dd/yyyy")
     val[x][25] = dateRtrn;
    }
  }

  // archive storage logic here
  if(val.length > 1200) {
    var i = val.length - 1;
    for(var x = 1; x<2; x++) {
      buildPostBody(val[i], function(postBody) {
        //Send body to sql to store
        const url = "http://lgltrax.lglship.com/hawbstore"
        Logger.log(postBody);
        sendFetchApp(url, postBody, function(result){
          if(result){
           //Delete row logic here 
           sheet.deleteRow(i);
           i = i-1;
          }else {
            Logger.log("sqlerror");
          }
        });        
      });
    }
  }
  return "success"
}

function buildPostBody(hawb, callback) {
  var h = hawb
  var postBody ={};
  postBody.A = h[0], postBody.B = h[1], postBody.C = h[2], postBody.D = h[3], postBody.E = h[4];
  postBody.F = h[5], postBody.G = h[6], postBody.H = h[7], postBody.I = h[8], postBody.J = h[9];
  postBody.K = h[10], postBody.L = h[11], postBody.M = h[12], postBody.N = h[13], postBody.O = h[14];
  postBody.P = h[15], postBody.Q = h[16], postBody.R = h[17], postBody.S = h[18], postBody.T = h[19];
  postBody.U = h[20], postBody.V = h[21], postBody.W = h[22], postBody.X = h[23], postBody.Y = h[24];
  postBody.Z = h[25], postBody.AA = h[26], postBody.AB = h[27], postBody.AC = h[28], postBody.AD = h[29];
  postBody.AE = h[30], postBody.AF = h[31], postBody.AG = h[32], postBody.AH = h[33], postBody.AI = h[34];
  postBody.AJ = h[35], postBody.AK = h[36], postBody.AL = h[37], postBody.AM = h[38], postBody.AN = h[39];
  postBody.AO = h[40], postBody.AP = h[41], postBody.AQ = h[42], postBody.AR = h[43], postBody.AS1 = h[44], postBody.AT = h[45];
  callback(postBody)
}

function sendFetchApp(url, body, callback) {
  var options = {
    'method' : 'post',
    'contentType': 'application/json',
    // Convert the JavaScript object to a JSON string.
    'payload' : JSON.stringify(body)
  }; 
  var response= UrlFetchApp.fetch(url, options);
  var statusCode = response.getResponseCode();
  Logger.log(statusCode)
  callback(true)

  // http.onreadystatechange = function() {
  //     if(this.status == 200) {
  //         Logger.log(http.responseText)
  //         callback(true)
  //     }else {
  //         Logger.log("failed")
  //         callback(false)
  //     }
  // }
}

// Make a POST request with a JSON payload.
var data = {
  'name': 'Bob Smith',
  'age': 35,
  'pets': ['fido', 'fluffy']
};
var options = {
  'method' : 'post',
  'contentType': 'application/json',
  // Convert the JavaScript object to a JSON string.
  'payload' : JSON.stringify(data)
};
UrlFetchApp.fetch('https://httpbin.org/post', options);


