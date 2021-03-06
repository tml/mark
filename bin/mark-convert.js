#!/usr/bin/env node

const debug = require('debug')('mark:convert');
const program = require('commander');
const fs = require('fs');
const mark = require('./../lib/mark.js');
	
// expose the metadata
exports.command = {
	description: 'Convert source file to other format'
};
  
// only runs when it's directly called
if (require.main === module) {
	// Parse options and run the magic
	console.log("Mark command line converter");
	
	program.version('0.1.0')
	.arguments('<file>')
	.option('-o, --output <output>', 'The output file name')
	.action(function(file) {
		debug("converting file ", file);
		var src = fs.readFileSync(file).toString();  // console.log('src', src);
		var opt = {};
		if (file.endsWith('.xml')) { opt.format ='xml';  debug('parse as xml'); }
		var html = mark.parse(src, opt);
		var outfile = program.output || 'output.mk';
		debug("output to: ", outfile);
		fs.writeFileSync(outfile, mark.stringify(html, null, '\t'));		
	})
	.parse(process.argv);	
}