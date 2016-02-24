var fs = require('fs'),
	path = require('path'),
	sass = require('node-sass'),
	functions = {
		'base64Font($file)': function(file) {
			var filePath = __dirname+'/public/fonts/'+(file.getValue()),
				output, data;
			
			data = fs.readFileSync(filePath);
			output = data.toString('base64');
			return new sass.types.String(output);
		}
	};

module.exports = functions;