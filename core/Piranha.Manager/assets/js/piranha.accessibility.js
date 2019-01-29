//
// Accessibility features
//

//
// Keyboard Shortcuts
//
$(window).on("keydown", function (e) {
    var menu = $(".main-nav");

    // Function key
    if (e.altKey) {
        // Pressed 'm', toggle menu
        if (e.keyCode == 77) {
            e.preventDefault();
            menu.toggleClass("active");
            menu.find(".active a").focus();
        }
    }

    // Keyboard movement within the main menu
    else if (menu.hasClass("active")) {
        var activeIndex = parseInt($(":focus").attr("data-index"));

        if (e.keyCode == 38) {
            menu.find("a[data-index='" + (activeIndex - 1) + "']").focus();
        } else if (e.keyCode == 40) {
            menu.find("a[data-index='" + (activeIndex + 1) + "']").focus();
        }
    }
});