var email = require('emailjs/email.js'),
	emailServer = email.server.connect({
        // user: "info@bugcleaners.com",
        // password: "Ari23k",
        // host: "smtpout.secureserver.net",
		user: "support@bugcleaners.com",
		password: "Ari23kalendarov",
		host: "smtp.gmail.com",
		port: 465,
		ssl: true
	}),
	sendEmail = 
		function(toName, toEmail, subject, message, attachment){
            var attachments = attachment || {};
            message = formatMessage(subject, message);
            
			var emailMessage = {
				from:    "BugCleaners <info@bugcleaners.com>", 
				to:      toName + " <"+toEmail+">",
				subject: subject,
				attachment: 
				[
					{data: message, alternative:true}//,
                    // attachments
				]
			};
			
			emailServer.send(emailMessage, function(error, message){console.log(error||message)});
		};

var emailTemplate = '<div id="body" style="background-color:#e3e3e3; width:100%; -webkit-text-size-adjust:none !important; margin:0; padding: 70px 0 70px 0;">\
    <table height="100%" border="0" cellpadding="0" cellspacing="0" width="100%">\
        <tbody>\
            <tr>\
                <td align="center" valign="top">\
                    <table id="logo_container" style="margin-bottom:30px" border="0" cellpadding="0" cellspacing="0" width="680px">\
                        <tbody>\
                            <tr>\
                                <td>\
                                <a href="http://bugcleaners.com" title="BugCleaners">\
                                    <img src="http://bugcleaners.com/img/logo.png" style="width:237px;height:auto;max-width:100%;" alt="logo"> </td>\
                                </a>\
                            </tr>\
                        </tbody>\
                    </table>\
                    <table id="template_container" style="-webkit-box-shadow:0 0 0 3px rgba(0,0,0,0.025) !important; box-shadow:0 0 0 3px rgba(0,0,0,0.025) !important; -webkit-border-radius:6px !important; border-radius:6px !important; background-color: #fafafa; border-radius:6px !important;" border="0" cellpadding="0" cellspacing="0" width="680px">\
                        <tbody>\
                            <tr>\
                                <td align="center" valign="top">\
                                    <table id="template_header" style="background-color: #f78515; color: #f1f1f1; -webkit-border-top-left-radius:6px !important; -webkit-border-top-right-radius:6px !important; border-top-left-radius:6px !important; border-top-right-radius:6px !important; border-bottom: 0; font-family:Arial; font-weight:bold; line-height:100%; vertical-align:middle;" border="0" cellpadding="0" cellspacing="0" width="100%">\
                                        <tbody>\
                                            <tr>\
                                                <td>\
                                                    <h1 style="color: #ffffff; margin:0; padding: 28px 24px; display:block; font-family:Arial; font-size:26px; font-weight:bold; text-align:center; line-height: 150%;" id="logo">\
														<a style="color: #ffffff; text-decoration: none;">%%EMAIL_SUBJECT%%</a>\
													</h1>\
                                                </td>\
                                            </tr>\
                                        </tbody>\
                                    </table>\
                                </td>\
                            </tr>\
                            <tr>\
                                <td align="center" valign="top">\
                                    <table id="template_body" border="0" cellpadding="0" cellspacing="0" width="100%">\
                                        <tbody>\
                                            <tr>\
                                                <td style="background-color: #fafafa; -webkit-border-radius:6px !important; border-radius:6px !important;" valign="top">\
                                                    <table border="0" cellpadding="20" cellspacing="0" width="100%">\
                                                        <tbody>\
                                                            <tr>\
                                                                <td valign="top">\
                                                                    <div style="color: #888888; font-family:Arial; font-size:14px; line-height:150%; text-align:left;">\
                                                                    	%%MESSAGE_CONTENT%%\
                                                                    </div>\
                                                                </td>\
                                                            </tr>\
                                                        </tbody>\
                                                    </table>\
                                                </td>\
                                            </tr>\
                                        </tbody>\
                                    </table>\
                                </td>\
                            </tr>\
                            <tr>\
                                <td align="center" valign="top">\
                                    <table id="template_footer" style="border-top:1px solid #E2E2E2; background: #eee; -webkit-border-radius:0px 0px 6px 6px; -o-border-radius:0px 0px 6px 6px; -moz-border-radius:0px 0px 6px 6px; border-radius:0px 0px 6px 6px;" border="0" cellpadding="10" cellspacing="0" width="100%">\
                                        <tbody>\
                                            <tr>\
                                                <td valign="top">\
                                                    <table border="0" cellpadding="10" cellspacing="0" width="100%">\
                                                        <tbody>\
                                                            <tr>\
                                                                <td colspan="2" id="credit" style="border:0; color: #777; font-family: Arial; font-size:12px; line-height:125%; text-align:center;" valign="middle">\
                                                                    ©2015 BugCleaners\
                                                                </td>\
                                                            </tr>\
                                                        </tbody>\
                                                    </table>\
                                                </td>\
                                            </tr>\
                                        </tbody>\
                                    </table>\
                                </td>\
                            </tr>\
                        </tbody>\
                    </table>\
                </td>\
            </tr>\
        </tbody>\
    </table>\
</div>';




function formatMessage(subject, message){
	subject = subject.replace('[BugCleaners] ', '');
	var output = emailTemplate;
		output = output.replace('%%EMAIL_SUBJECT%%', subject);
		output = output.replace('%%MESSAGE_CONTENT%%', message);
	return output;
}



module.exports = sendEmail;