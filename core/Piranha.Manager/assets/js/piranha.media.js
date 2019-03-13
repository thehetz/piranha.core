//
// Copyright (c) 2017-2019 Håkan Edling
//
// This software may be modified and distributed under the terms
// of the MIT license.  See the LICENSE file for details.
//
// http://github.com/piranhacms/piranha.core
//

/*global
    piranha, baseUrl, Vue
 */

//
// TODO: Move to central location
//
Dropzone.autoDiscover = false;

if (typeof(piranha)  == "undefined") {
    piranha = {};
}

if (typeof(piranha.app) == "undefined") {
    piranha.app = {};
}

piranha.app.media = new Vue({
    el: "#modalMedia",
    data: {
        search: "",
        folders: [],
        media: [],
        currentFolderId: null,
        parentFolderId: null
    },
    computed: {
        filteredFolders() {
            var self = this;
            return this.folders.filter(function (item) {
                return item.name.toLowerCase().indexOf(self.search.toLowerCase()) > -1;
            });
        },
        filteredMedia() {
            var self = this;
            return this.media.filter(function (item) {
                return item.filename.toLowerCase().indexOf(self.search.toLowerCase()) > -1;
            });
        }
    },
    methods: {
        onItemSelected: function (result) {
            console.log(result);
        },
        init: function (callback) {
            this.onItemSelected = callback;
            this.search = "";
        },
        load: function (id) {
            fetch(piranha.baseUrl + "manager/api/media/list/" + (id != null ? id : ""))
                .then(function (response) { return response.json(); })
                .then(function (result) {
                    piranha.app.media.search = "";
                    piranha.app.media.folders = result.folders;
                    piranha.app.media.media = result.media;
                    piranha.app.media.currentFolderId = result.currentFolderId;
                    piranha.app.media.parentFolderId = result.parentFolderId;
                })
                .catch(function (error) { console.log("error:", error ); });
        },
        reload: function () {
            console.log("reload: " + this.currentFolderId);

            this.load(this.currentFolderId);
        },
        selectItem: function (item) {
            // Call onItemSelected
            if (this.onItemSelected != null) {
                this.onItemSelected(item);
                this.onItemSelected = null;
            }

            // Close modal
            $("#modalMedia").modal("hide");
        }
    },
    created: function () {
        this.load();
    }
});

//
// Attach dropzone
//
$("#dropzonemodal").dropzone({
    paramName: "Uploads",
    url: piranha.baseUrl + "manager/media/modal/add",
    uploadMultiple: true,
    init: function () {
        this.on("queuecomplete", function (file) {
            piranha.app.media.reload();
            this.removeAllFiles();
        });
    }
});
