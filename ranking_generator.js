/**
 * This is a program to generate the league standing for EDTA tournaments. This scripts assumes the following things:
 * 1. The matches and the scores are recored in a certain way. An Example of it is the enclosed file U14Boys.xlsx.
 * 2. There is not sequence to the matches. 
 * 3. The scoring function to be made interchangable for future change in format/judgement.
 */


const { describe } = require('yargs');
const yargs = require('yargs');

const argv = yargs
	.usage('$0  -f [file]')
	.alias('f', 'file')
	.describe('f', 'generate for file')
	.demandOption(['f'])
	.help().argv;

// var fs = require('fs');
// var s = fs.createReadStream(argv.file);

if(typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile(argv.file);

var first_sheet_name = workbook.SheetNames[0];
var worksheet = workbook.Sheets[first_sheet_name];

const matches = XLSX.utils.sheet_to_json(worksheet);
let players_found = {};
let players_score = {};


matches.forEach(match => {
	
	if(match['Winner'] && match['Winner'] != undefined ){
		if(match['Player_1'] && !players_found[match['Player_1']]){
			players_found[match['Player_1']] = 1;
			players_score[match['Player_1']] = 0;
		}

		if(match['Player_2'] && !players_found[match['Player_2']]){
			players_found[match['Player_2']] = 1;
			players_score[match['Player_2']] = 0;
		}

		if(match['Player_1'] === match['Winner'] || match['Player_2'] === match['Winner']){
			players_score[match['Winner']] += 3;
		}
		
		
	}	
});

const sortable = Object.entries(players_score)
    .sort(([,a],[,b]) => b-a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

Object.keys(sortable).forEach((player) => {
	console.log('<li>'+ player +' => '+ sortable[player] +'</li>');
});




