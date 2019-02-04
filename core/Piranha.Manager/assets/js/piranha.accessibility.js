//
// Accessibility features
//

/*global
    tinymce
 */

//
// Keyboard Shortcuts
//
$(window).on("keydown", function (e) {
    var menu = $(".main-nav");

    // Function key
    if (e.altKey) {
        // Pressed 'm', toggle menu
        if (e.keyCode === 77) {
            e.preventDefault();
            menu.toggleClass("active");
            menu.find(".active a").focus();
        }
        // Pressed backspace, check for focused block
        else if (e.keyCode === 8) {
            var block = $(":focus").parents(".block:not(.title-block)");

            if (block.length === 1) {
                console.log("Remove focused block");

                // Check if we have an active editor
                if (tinymce) {
                    var editor = tinymce.activeEditor;

                    if (editor && editor.inline) {
                        console.log("Destroying active editor");
                        editor.destroy();
                    }
                }

                // Remove focused block
                block.find(".block-remove").click();
            }
        }
    }

    // Escape key
    if (e.keyCode === 27) {
        var panels = $(".panel.active");

        if (panels.length > 0) {
            panels.removeClass("active");
            $(".block-add.active").removeClass("active");

            if (piranha.prevFocus) {
                piranha.prevFocus.focus();
                piranha.prevFocus = null;
            } else {
                $(":focus").blur();
            }
        }
    }

    // Keyboard movement within the main menu
    else if (menu.hasClass("active")) {
        var activeIndex = parseInt($(":focus").attr("data-index"));

        if (e.keyCode === 38) {
            e.preventDefault();
            menu.find("a[data-index='" + (activeIndex - 1) + "']").focus();
        } else if (e.keyCode === 40) {
            e.preventDefault();
            menu.find("a[data-index='" + (activeIndex + 1) + "']").focus();
        }
    }
});