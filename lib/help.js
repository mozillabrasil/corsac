/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true,
strict:true, undef:true, unused:true, curly:true, browser:false, indent:4,
maxerr:50 */

/*global require, console, process*/

// TODO: It needs paramns definition

var cliHelp = require('commander');

cliHelp
  .version('0.0.1')
  .option('-p, --peppers', 'Add peppers')
  .option('-P, --pineapple', 'Add pineapple')
  .option('-b, --bbq', 'Add bbq sauce')
  .option('-c, --cheese <type>', 'Add the specified type of cheese [marble]')
  .option('-C, --no-cheese', 'You do not want any cheese')
  .parse(process.argv);

console.log('you ordered a pizza with:');

if (cliHelp.peppers) {
    console.log(' - peppers');
}

if (cliHelp.pineapple) {
    console.log(' - pineapple');
}

if (cliHelp.bbq) {
    console.log(' - bbq');
}

var cheese = true === cliHelp.cheese
  ? 'marble'
  : cliHelp.cheese || 'no';

console.log(' - %s cheese', cheese);
console.log(cliHelp.args);