/**
 * Get Sheet where mail is store. The SpreadSheet ID's store in Properties of Script.
 * @returns {GoogleAppsScript.Spreadsheet.Sheet}
 */
function getSheetMail() {
    const SS_ID = PropertiesService.getScriptProperties().getProperty("SS_DATABASE");
    const SS = SpreadsheetApp.openById(SS_ID)
    return SS.getSheetByName("MAIL")
}

/**
 * Compare password in parameter with password store in Script Properties.
 * @param {String} password
 * @returns {boolean}
 */
function comparePassword(password) {
    return PropertiesService.getScriptProperties().getProperty("PASSWORD") === password;
}