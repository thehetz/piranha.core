//
// Accessibility features
//

/*global
    piranha, tinymce
 */

if (typeof(piranha)  == "undefined") {
    piranha = {};
}

piranha.accessibility = new function() {
    "use strict";

    var self = this;

    self.menu = $(".main-nav");

    self.toggleMenu = function (e) {
        e.preventDefault();

        self.menu.toggleClass("active");
        self.menu.find(".active a").focus();
    };

    self.removeBlock = function (e) {
        var block = $(":focus").parents(".block:not(.title-block)");

        if (block.length === 1) {
            // Check if we have an active editor
            if (tinymce) {
                var editor = tinymce.activeEditor;

                if (editor && editor.inline) {
                    editor.destroy();
                }
            }

            // Remove focused block
            block.find(".block-remove").click();
        }
    };

    //
    // Keyboard Shortcuts
    //
    $(window).on("keydown", function (e) {
        var menu = $(".main-nav");

        // Function key
        if (e.altKey) {
            // Pressed 'm', toggle menu
            if (e.keyCode === 77) {
                self.toggleMenu(e);
            }
            // Pressed backspace, check for focused block
            else if (e.keyCode === 8) {
                self.removeBlock(e);
            }
            // Keyboard movement within active block
            else if (e.keyCode === 38 || e.keyCode === 40) {
                var up = e.keyCode === 38;
                var block = $(":focus").parents(".block-item");

                if (block.length === 1) {
                    var blocks = $(".blocks .block-item");
                    var index = blocks.index(block.get(0));

                    console.log("Active index " + index);

                    // Make sure we can actually move the current block
                    if (up && index === 0)
                        return;
                    if (!up && index === blocks.length - 1)
                        return;

                    // Store the currently focused element
                    var focus = $(":focus");

                    // Remove the focused block from the DOM
                    var activeBlock = $(block.get(0)).detach();

                    // Now insert it again
                    piranha.blocks.insertBlock(activeBlock, index + (up ? -1 : 1));

                    // Refocus
                    focus.focus();
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
                    piranha.blocks.selectedIndex = null;
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
}