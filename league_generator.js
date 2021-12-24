const argv = require('yargs/yargs')(process.argv.slice(2))
.options(
	{	'player_count': {
			alias: 'p', 
			description: 'number of players', 
			type: 'number',
		},
	
		'prefix': {
			alias: 'x',
			description: 'for generating the game code',
			type: 'string',
		}
	}
)
.argv;


// if(typeof require !== 'undefined') XLSX = require('xlsx');

// let ws_name = "Draw";
// var wb = XLSX.utils.book_new();

let ws_data = [["SortCode", "Player_1", "Player_2", "Player_1_Score", "Player_2_Score", "Winner", "Game_Code"]];
// console.log('SortCode',',','Player_1',',','Player_2 ',',', 'Player_1_Score',',', 'Player_2_Score',',','Winner',',','Game_Code');
console.log(ws_data.join(','));

if( ( argv.p || argv.player_count ) && ( argv.w || argv.weeks)) {
	//console.log('Generating league table for '+ argv.p +' players , over '+ argv.w + ' weeks!');

	let table = [];

	for(let i = 0; i <= argv.p; i++) {
		table[i] = Array(argv.p).fill(0)
	}

	const number_of_games = argv.p * argv.p;
	let games_per_week = number_of_games/argv.w;

	let week_count = 0;
	let game_count = 0;

	for(let i = 0; i < argv.p; i++) {
		for(let j = argv.p - 1; j >= 0; j-- ){
			
			if(i === j) {
				continue;
			}
			if(table[i][j] === 1 && table[j][i] === 1){
				continue;
			} else {
				table[i][j] = 1;
				table[j][i] = 1;
			}

			if(game_count >= games_per_week) {
				game_count = 0;
				week_count += 1;
				//console.log('Week No '+week_count);
			} else {
				game_count += 1;
			}

			let p1 = parseInt(i+1);
			let p2 = parseInt(j+1);
			let player1 = '=$Sheet2.A'+p1;
			let player2 = '=$Sheet2.A'+p2;
			//console.log('Player '+ p1+' Vs '+ 'Player '+ p2);

			// ws_data.push([Math.random(),player1,player2,'','','',argv.x+game_count]);
			console.log(Math.random(),',','=$Sheet2.A'+p1+',','=$Sheet2.A'+p2,',' ,'',',','',',','',','+argv.x+game_count);
		}

	}

	// var ws = XLSX.utils.aoa_to_sheet(ws_data);
	// XLSX.utils.sheet_to_csv(ws);

	// /* Add the worksheet to the workbook */
	// XLSX.utils.book_append_sheet(wb, ws, ws_name);
	// // console.log(ws_data);
	// XLSX.writeFile(wb, 'out.csv');
	// //console.log(JSON.stringify(table));

}

