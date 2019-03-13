/*
 * Copyright (c) 2019 Håkan Edling
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 *
 * https://github.com/piranhacms/piranha.core
 *
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Piranha.Models;
using Piranha.Services;

namespace Piranha.Areas.Manager.Models
{
    public class MediaApiListModel
    {
        public class FolderItem
        {
            public Guid Id { get; set; }
            public string Name { get; set; }
            public int ItemCount { get; set; }
        }

        public class MediaItem
        {
            public Guid Id { get; set; }
            public string Type { get; set; }
            public string Filename { get; set; }
            public string PublicUrl { get; set; }
            public long Size { get; set; }
            public string LastModified { get; set; }
        }

        /// <summary>
        /// Gets/sets the available folders.
        /// </summary>
        public IList<FolderItem> Folders { get; set; } = new List<FolderItem>();

        /// <summary>
        /// Gets/sets the available media items.
        /// </summary>
        public IList<MediaItem> Media { get; set; } = new List<MediaItem>();

        /// <summary>
        /// Gets/sets the optional folder id.
        /// </summary>
        public Guid? CurrentFolderId { get; set; }

        /// <summary>
        /// Gets/sets the optional parent id.
        /// </summary>
        public Guid? ParentFolderId { get; set; }

        public static async Task<MediaApiListModel> Get(IApi api, Guid? folderId = null)
        {
            var model = new MediaApiListModel
            {
                CurrentFolderId = folderId,
                ParentFolderId = null
            };

            if (folderId.HasValue)
            {
                var folder = api.Media.GetFolderById(folderId.Value);
                if (folder != null)
                {
                    model.ParentFolderId = folder.ParentId;
                }
            }
            model.Media = (await api.Media.GetAllAsync(folderId))
                .Select(m => new MediaItem
                {
                    Id = m.Id,
                    Type = m.Type.ToString(),
                    Filename = m.Filename,
                    PublicUrl = m.PublicUrl.Replace("~", ""),
                    Size = m.Size,
                    LastModified = m.LastModified.ToString("yyyy-MM-dd")
                }).ToList();

            var structure = await api.Media.GetStructureAsync();
            model.Folders = structure.GetPartial(folderId).Select(f => new FolderItem
            {
                Id = f.Id,
                Name = f.Name
            }).ToList();

            foreach (var folder in model.Folders)
            {
                folder.ItemCount = (await api.Media.GetAllAsync(folder.Id)).Count();
            }
            return model;
        }
    }
}