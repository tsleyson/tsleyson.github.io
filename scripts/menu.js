function hideMenus(navID) {
    $('#' + navID + ' > li > ul')
    .hide()
    .click(function(event) {
        event.stopPropagation();
    });
}
