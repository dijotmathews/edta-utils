// require('xls').parse('U14Boys.xlsx', function(err, data) {
// 	// xls file parsed into data

// 	console.log(data);
// });

if(typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('U14Boys.xlsx');

var first_sheet_name = workbook.SheetNames[0];
var worksheet = workbook.Sheets[first_sheet_name];

console.log(first_sheet_name)