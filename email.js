var email = require('emailjs/email.js'),
	emailServer = email.server.connect({
		user: "info@bugcleaners.com",
		password: "Ari23k",
		host: "smtpout.secureserver.net",
		port: 465,
		ssl: true
	}),
	sendEmail = 
		function(toName, toEmail, subject, message){
			var emailMessage = {
				from:    "BugCleaners <info@bugcleaners.com>", 
				to:      toName + " <"+toEmail+">",
				subject: subject,
				attachment: 
				[
					{data: message, alternative:true}
				]
			};
			
			emailServer.send(emailMessage, function(error, message){console.log(error||message)});
		};


module.exports = sendEmail;