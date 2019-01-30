//
// Copyright (c) 2018-2019 Håkan Edling
//
// This software may be modified and distributed under the terms
// of the MIT license.  See the LICENSE file for details.
//
// http://github.com/piranhacms/piranha.core
//

/*global
    piranha, baseUrl, sortable
 */

if (typeof(piranha)  == "undefined") {
    piranha = {};
}

piranha.blocks = new function() {
    "use strict";

    var self = this;

    /**
     * Initializes the block component.
     */
    self.init = function () {
        // Create block type list
        var types = sortable(".block-types", {
            items: ":not(.unsortable)",
            acceptFrom: false,
            copy: true
        });

        // Create the main block list
        var blocks = sortable(".blocks", {
            handle: ".sortable-handle",
            items: ":not(.unsortable)",
            acceptFrom: ".blocks,.block-types"
        });

        // Create the block group lists
        var groups = sortable(".block-group-list .list-group", {
            items: ":not(.unsortable)",
            acceptFrom: ".block-group-list .list-group,.block-types"
        });

        //
        // Add sortable events for block groups
        //
        for (var n = 0; n < groups.length; n++) {
            groups[n].addEventListener("sortupdate", function (e) {
                // Get the destination index, the moved item and the block list
                var destination = e.detail.destination.index;
                var item = $("#" + $(e.detail.item).attr("data-id"));

                // Detach the moved item from the block list
                $(item).detach();

                // Get the current item list with the moved item detached
                var list = $(e.detail.item).closest(".block-group").find(".block-group-item");

                // Add it back to the destination position
                if (destination > 0) {
                    $(item).insertAfter(list.get(destination - 1));
                } else {
                    $(item).insertBefore(list.get(0));
                }

                // Recalc form indexes
                self.recalcBlocks();
            });
        }

        //
        // Add sortable events for blocks
        //
        blocks[0].addEventListener("sortupdate", function (e) {
            var item = e.detail.item;

            if ($(item).hasClass("block-type")) {
                //
                // New block dropped in block list, create and
                // insert editor view.
                //
                $.ajax({
                    url: piranha.baseUrl + "manager/block/create",
                    method: "POST",
                    contentType: "application/json",
                    dataType: "html",
                    data: JSON.stringify({
                        TypeName: $(item).data("typename"),
                        BlockIndex: e.detail.destination.index
                    }),
                    success: function (res) {
                        // Remove the block-type container
                        $(".blocks .block-type").remove();

                        // Add the new block at the requested position
                        $(res).insertBefore($(".blocks .block-item").get(e.detail.destination.index));

                        // If the new region contains a html editor, make sure
                        // we initialize it.
                        var editors = $(res).find(".block-editor").each(function () {
                            addInlineEditor("#" + this.id);
                        });

                        // Update the sortable list
                        sortable(".blocks", {
                            handle: ".sortable-handle",
                            items: ":not(.unsortable)",
                            acceptFrom: ".blocks,.block-types"
                        });

                        // Unhide
                        $(".blocks .loading").removeClass("loading");

                        // Recalc form indexes
                        self.recalcBlocks();

                        // Deactiveate the block panel
                        $("#panelBlocks").removeClass("active");
                    }
                });
            } else {
                // Recalc form indexes
                self.recalcBlocks();
            }
        });
    };

    /**
     * Selects an item in a block group list.
     *
     * @param {*} elm The block to select.
     */
    self.selectGroupItem = function (elm) {
        // Activate/deactivate list items
        elm.parent().find(".list-group-item").removeClass("active");
        elm.addClass("active");

        // Hide/show item details
        elm.closest(".block-group").find(".block-group-item:not(.d-none)").addClass("d-none");
        $("#" + elm.attr("data-id")).removeClass("d-none");
    };

    /**
     * Removes the given block from the current page.
     *
     * @param {*} elm The block to remove.
     */
    self.removeBlock = function (elm) {
        // Remove the block
        elm.remove();

        // Recalc form indexes
        self.recalcBlocks();
    };

    /**
     * Recalculates all form elements after an item has been
     * moved or inserted in the UI.
     */
    self.recalcBlocks = function () {
        var items = $(".body-content .blocks > .block-item .block");

        for (var n = 0; n < items.length; n++) {
            var inputs = $(items.get(n)).find("input, textarea, select");

            inputs.attr("id", function (i, val) {
                if (val) {
                    return val.replace(/Blocks_\d+__/, "Blocks_" + n + "__");
                }
                return val;
            });
            inputs.attr("name", function (i, val) {
                if (val) {
                    return val.replace(/Blocks\[\d+\]/, "Blocks[" + n + "]");
                }
                return val;
            });

            var content = $(items.get(n)).find("[contenteditable=true]");
            content.attr("data-id", function (i, val) {
                if (val) {
                    return val.replace(/Blocks_\d+__/, "Blocks_" + n + "__");
                }
                return val;
            });

            var media = $(items.get(n)).find("button");
            media.attr("data-mediaid", function (i, val) {
                if (val) {
                    return val.replace(/Blocks_\d+__/, "Blocks_" + n + "__");
                }
                return val;
            });

            var subitems = $(items.get(n)).find(".block-group-item");

            for (var s = 0; s < subitems.length; s++) {
                var subInputs = $(subitems.get(s)).find("input, textarea, select");

                subInputs.attr("id", function (i, val) {
                    if (val) {
                        return val.replace(/Blocks_\d+__Items_\d+__/, "Blocks_" + n + "__Items_" + s + "__");
                    }
                    return val;
                });
                subInputs.attr("name", function (i, val) {
                    if (val) {
                        return val.replace(/Blocks\[\d+\].Items\[\d+\]/, "Blocks[" + n + "].Items[" + s + "]");
                    }
                    return val;
                });

                var subContent = $(subitems.get(s)).find("[contenteditable=true]");
                subContent.attr("data-id", function (i, val) {
                    if (val) {
                        return val.replace(/Blocks_\d+__Items_\d+__/, "Blocks_" + n + "__Items_" + s + "__");
                    }
                    return val;
                });

                var subContent = $(subitems.get(s)).find("button");
                subContent.attr("data-mediaid", function (i, val) {
                    if (val) {
                        return val.replace(/Blocks_\d+__Items_\d+__/, "Blocks_" + n + "__Items_" + s + "__");
                    }
                    return val;
                });
            }
        }
    };

    $(document).on("click", ".block-remove", function (e) {
        e.preventDefault();
        self.removeBlock($(this).closest(".block-item"));
    });

    $(document).on("focus", ".block .empty", function () {
        $(this).removeClass("empty");
        $(this).addClass("check-empty");
    });

    $(document).on("blur", ".block .check-empty", function () {
        //if (piranha.tools.isEmpty(this)) {
        if (manager.tools.isEmpty(this)) {
            $(this).removeClass("check-empty");
            $(this).addClass("empty");
        }
    });

    $(document).on("click", ".block-group-list .list-group a", function (e) {
        e.preventDefault();
        self.selectGroupItem($(this));
    });

    $(document).on("click", ".block-html-swap", function(e) {
        e.preventDefault();

        var columns = $(this).parent().parent().find(".block-editor");
        if (columns.length === 2) {
            var col1 = $(columns[0]).html();
            var col2 = $(columns[1]).html();

            $(columns[0]).html(col2);
            $(columns[1]).html(col1);
        }
    });
};