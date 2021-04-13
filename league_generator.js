const yargs = require('yargs');

const argv = yargs
// .command('leage_generator', 'Generate league schedule for number of players and weeks specified', {
// 	player_count: {
// 		description: 'the cound of players registered',
// 		alias: 'p',
// 		type: 'number'
// 	}, 
// 	weeks: {
// 		description: 'number of weeks available to schedule',
// 		alias: 'w', 
// 		type: 'number'
// 	}
// })
.option('player_count', {
	alias: 'p', 
	description: 'number of players', 
	type: 'number',
})
.argv;

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
			//console.log('Player '+ p1+' Vs '+ 'Player '+ p2);
//=$Sheet2.A1
			console.log(Math.random(),',','=$Sheet2.A'+p1+',','=$Sheet2.A'+p2);
		}

	}

	//console.log(JSON.stringify(table));

}

