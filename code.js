/**
 * Handler of request GET.
 * @param {Object} e - Parameter of request.
 * @returns {GoogleAppsScript.HTML.HtmlOutput}
 */
function doGet(e) {
    if (!Object.keys(e.parameters).length || !e.parameter.email) {
        return HtmlService.createHtmlOutputFromFile('index')
    }
    const email = e.parameter.email
    if (e.parameter.action === 'register') {
        return register(email)
    } else if (e.parameter.action === 'unsubscribe') {
        return unsubscribe(email)
    } else {
        return HtmlService.createHtmlOutputFromFile('index')
    }
}

/**
 * Handler of request POST.
 * @param {Object} e - Parameter of request.
 * @returns {GoogleAppsScript.Content.TextOutput}
 */
function doPost(e) {
    try {
        if (!comparePassword(e.parameter.password)) {
            return ContentService.createTextOutput(JSON.stringify({
                code: 403,
                message: "bad Password",
                params: e
            })).setMimeType(ContentService.MimeType.JSON);
        }
        const html = HtmlService.createTemplateFromFile("update")
        html.title = e.parameter.title
        html.subtitle = e.parameter.subtitle
        html.img = e.parameter.img
        html.updateTitle = e.parameter.updateTitle
        html.link = e.parameter.link
        html.time = e.parameter.time

        const mails = getSheetMail().getDataRange().getValues().map((e) => e[0])
        mails.forEach(mail => {
            html.unsubscribe = "https://script.google.com/macros/s/AKfycbxa6awnYOz_-13orRJPwPcu78Cf3t5EGS4yGlHkSIXuzn3hMOgASseNCBGd9D6fVSYvfg/exec?action=unsubscribe&email=" + mail
            const htmlDone = html.evaluate()

            MailApp.sendEmail({
                noReply: true,
                htmlBody: htmlDone.getContent(),
                to: mail,
                subject: e.parameter.title,
            })
        })
        return ContentService.createTextOutput(JSON.stringify({
            code: 200,
            message: "success"
        })).setMimeType(ContentService.MimeType.JSON);
    } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({
            code: 500,
            message: error,
            params: e
        })).setMimeType(ContentService.MimeType.JSON);
    }
}
