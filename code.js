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
  var dataObj = {hawb:val}
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

