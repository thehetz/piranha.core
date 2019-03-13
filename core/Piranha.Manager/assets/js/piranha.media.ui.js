//
// Copyright (c) 2017-2019 Håkan Edling
//
// This software may be modified and distributed under the terms
// of the MIT license.  See the LICENSE file for details.
//
// http://github.com/piranhacms/piranha.core
//

/*global
    piranha, baseUrl
 */

//
// Clear media field
//
$(document).on("click", ".btn-media-clear", function () {
    // Remove selected id
    var idCtrl = $("#" + $(this).attr("data-mediaid"));
    if (idCtrl != null) {
        idCtrl.val("");
    }

    // Remove public url
    var urlCtrl = $("#" + $(this).data("mediaurlid"));
    if (urlCtrl != null) {
        if (urlCtrl.prop("tagName") === "IMG") {
            urlCtrl.attr("src", piranha.baseUrl + "manager/assets/img/empty-image.png");
        } else {
            urlCtrl.val(piranha.baseUrl + "manager/assets/img/empty-image.png");
        }
    }

    // Remove filename & meta data
    var nameCtrl = $("#" + $(this).data("medianame"));
    if (nameCtrl != null) {
        nameCtrl.text("");
        nameCtrl.data("filename", "");
        nameCtrl.data("url", "");
        nameCtrl.data("contenttype", "");
        nameCtrl.data("filesize", "");
        nameCtrl.data("modified", "");
    }
});

$(document).on("click", ".dropzone a", function (e) {
    e.preventDefault();
});

$(document).on("shown.bs.modal",".modal", function (event) {
    $(this).find("input[autofocus]").focus();
});

$(document).on("show.bs.modal","#modalMedia", function (event) {
    piranha.app.media.init(function (result) {
        // Set selected id
        var idCtrl = $("#" + $(event.relatedTarget).attr("data-mediaid"));
        if (idCtrl != null) {
            idCtrl.val(result.id);
        }

        // Set public url
        var urlCtrl = $("#" + $(event.relatedTarget).data("mediaurlid"));
        if (urlCtrl != null) {
            if (urlCtrl.prop("tagName") === "IMG") {
                urlCtrl.attr("src", result.publicUrl);
            } else {
                urlCtrl.val(result.publicUrl);
            }
        }

        // Set filename & meta data
        var nameCtrl = $("#" + $(event.relatedTarget).data("medianame"));
        if (nameCtrl != null) {
            nameCtrl.text(result.filename);
            nameCtrl.data("filename", result.filename);
            nameCtrl.data("url", result.publicUrl);
            nameCtrl.data("contenttype", result.contentType);
            nameCtrl.data("filesize", result.size);
            nameCtrl.data("modified", result.lastModified);
        }
    });
});

$(document).on("show.bs.modal","#modalImgPreview", function (event) {
    var link = $(event.relatedTarget);
    var filename = link.data("filename");
    var url = link.data("url");
    var contenttype = link.data("contenttype");
    var filesize = link.data("filesize");
    var modified = link.data("modified");
    var id = link.data("id");
    var parentid = link.data("parentid");

    var modal = $(this);
    modal.find(".modal-title").text(filename);
    modal.find("#btnDownload").attr("href", url);
    modal.find("#previewContentType").text(contenttype);
    modal.find("#previewFilesize").text(filesize);
    modal.find("#previewModified").text(modified);
    modal.find("#previewId").val(id);
    modal.find("#previewParentId").val(parentid);

    if (!id || id === "") {
        modal.find(".fileinput").hide();
    } else {
        modal.find(".fileinput").show();
    }

    if (contenttype.startsWith("image")) {
        modal.find("#previewImage").show();
        modal.find("#previewVideo").hide();
        modal.find("#previewDocument").hide();

        modal.find("#imgPreview").attr("alt", filename);
        modal.find("#imgPreview").attr("src", url);
    } else if (contenttype.startsWith("video")) {
        modal.find("#previewImage").hide();
        modal.find("#previewVideo").show();
        modal.find("#previewDocument").hide();

        modal.find("video").attr("src", url);
        modal.find("video").attr("type", contenttype);
    } else if (contenttype === "application/pdf") {
        modal.find("#previewImage").hide();
        modal.find("#previewVideo").hide();
        modal.find("#previewDocument").show();

        modal.find("#previewDocument iframe").attr("src", url);
    }
});