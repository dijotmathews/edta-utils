const fs  = require('fs');
const parse = require('csv-parse');

const parser = parse({columns: true}, function(err, records){
	console.log(records['Timestamp']);

});


fs.createReadStream(__dirname+'/players.csv').pipe(parser);
// const file = reader.readFile('./players.csv');
