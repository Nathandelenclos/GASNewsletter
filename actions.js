function register(email) {
    const html = HtmlService.createTemplateFromFile("emailNewsletterRegister")
    html.title = "You were well registered!"
    html.description = "You have just subscribed to Nathan Delenclos' newsletter, an email will be sent to you automatically each time one of the projects has been updated!"
    html.unsubscribe = "No longer want to receive these emails?&nbsp;<a href=\"https://script.google.com/macros/s/AKfycbxa6awnYOz_-13orRJPwPcu78Cf3t5EGS4yGlHkSIXuzn3hMOgASseNCBGd9D6fVSYvfg/exec?action=unsubscribe&email=" + email + "\" target=\"_blank\" style=\"-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px\">Unsubscribe</a>."
    const htmlDone = html.evaluate()
    getSheetMail().appendRow([email])
    MailApp.sendEmail({
        to: email,
        htmlBody: htmlDone.getContent(),
        subject: html.title,
        noReply: true,
    })
    return htmlDone
}

function unsubscribe(email) {
    const html = HtmlService.createTemplateFromFile("emailNewsletterRegister")
    html.title = "You have unsubscribed!"
    html.description = "You have just unsubscribed from the Nathan Delenclos newsletter, you will no longer receive updates on the different projects!"
    html.unsubscribe = ""
    const htmlDone = html.evaluate()

    const rowPosition = getSheetMail().getDataRange().getValues().findIndex((e) => e[0] === email)
    getSheetMail().deleteRow(rowPosition + 1)
    MailApp.sendEmail({
        to: email,
        htmlBody: htmlDone.getContent(),
        subject: html.title,
        noReply: true,
    })
    return htmlDone
}