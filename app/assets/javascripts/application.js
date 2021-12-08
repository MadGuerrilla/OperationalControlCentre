/* global $ */
/* global GOVUK */

// Warn about using the kit in production
if (
    window.sessionStorage && window.sessionStorage.getItem('prototypeWarning') !== 'false' &&
    window.console && window.console.info
) {
    window.console.info('GOV.UK Prototype Kit - do not use for production')
    window.sessionStorage.setItem('prototypeWarning', true)
}

$(document).ready(function() {
    // Use GOV.UK selection-buttons.js to set selected
    // and focused states for block labels
    var $blockLabels = $(".block-label input[type='radio'], .block-label input[type='checkbox']")
    new GOVUK.SelectionButtons($blockLabels) // eslint-disable-line

    // Use GOV.UK shim-links-with-button-role.js to trigger a link styled to look like a button,
    // with role="button" when the space key is pressed.
    GOVUK.shimLinksWithButtonRole.init()

    // Show and hide toggled content
    // Where .block-label uses the data-target attribute
    // to toggle hidden content
    var showHideContent = new GOVUK.ShowHideContent()
    showHideContent.init()
})

function getMonday() {
    var today = new Date();
    var day = today.getDay() || 7; // Get current day number, converting Sun. to 7
    if (day !== 1) // Only manipulate the date if it isn't Mon.
        today.setHours(-24 * (day - 1)); // Set the hours to day number minus 1
    //   multiplied by negative 24
    today = moment(today).format().toString().split('T')[0];
    return Number(parseInt(moment(today).format('X')));
}
