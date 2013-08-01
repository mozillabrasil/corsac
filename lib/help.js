/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true,
strict:true, undef:true, unused:true, curly:true, browser:false, indent:4,
maxerr:50 */

/*global require, console, process*/


(function () {
    'use strict';

    var program = require('commander'),
        packageJSON = require('./../package.json');

    // TODO: It needs paramns definition
    program
        .version(packageJSON.version)
        .option('-n, --new [name]', 'Run something randon');

    // new event
    program.on('new', function (a) {
        console.log('Run --new> Param %s', a);
    });

    // Reference https://github.com/visionmedia/commander.js/blob/master/examples/custom-help
    program.parse(process.argv);

    if (process.argv.length === 2) {
        program.help();
    }
}());