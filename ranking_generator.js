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
			players_score[match['Player_1']] = 50;
		}

		if(match['Player_2'] && !players_found[match['Player_2']]){
			players_found[match['Player_2']] = 1;
			players_score[match['Player_2']] = 50;
		}

		let score = [];
		if(match['Player_1'] === match['Winner']) {
			score = calculate_ranking(players_score[match['Player_1']], players_score[match['Player_2']],
				match['Player_1_Score'], match['Player_2_Score']);
			players_score[match['Player_1']] = score[0];
			players_score[match['Player_2']] = score[1];
		} else if (match['Player_2'] === match['Winner']){ 
			score = calculate_ranking(players_score[match['Player_2']], players_score[match['Player_1']],
				match['Player_2_Score'], match['Player_1_Score']);
			players_score[match['Player_2']] = score[0];
			players_score[match['Player_1']] = score[1];
		}
		
		
	}	
});

const sortable = Object.entries(players_score)
    .sort(([,a],[,b]) => b-a)
	.reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

// console.log(sortable);
// return ;

var fs = require('fs');

let html = `<html><head>
<style>
table, td, th {
  border: 1px solid black;
}

table {
  width: 50%;
  border-collapse: collapse;
}
</style>
</head><body>`;

html += `<table>
		<tr><th> Rank </th> <th> Player </th><th> Points </th></tr>`;
let rank = 1;
Object.keys(sortable).forEach((player) => {
	html += `<tr> <td> ${rank} </td> <td> ${player} </td> <td> ${sortable[player].toFixed(2)} </td> </tr>`;
	++rank;
});

html += "</table>";

html += "</body></html>";

fs.writeFile(argv.file+'.html', html, (error) => { 
	
	/* handle error */ 
});

function calculate_ranking(winners_current_ranking, loosers_current_ranking, winners_scores, loosers_scores){
	

	let winner_total_games = winners_scores.toString().split(',').reduce((a,b) => a+b);
	let looser_total_games = loosers_scores.toString().split(',').reduce((a,b) => a+b);

	let delta_s = winner_total_games - looser_total_games;

	let new_winner_ranking = winners_current_ranking + 
			(delta_s * 2 * loosers_current_ranking) / (winners_current_ranking + loosers_current_ranking) ;
	let new_looser_ranking = loosers_current_ranking - 
			(delta_s * 2 * winners_current_ranking) / (winners_current_ranking + loosers_current_ranking) ;


	return [new_winner_ranking,new_looser_ranking];

}
// console.log(html);

