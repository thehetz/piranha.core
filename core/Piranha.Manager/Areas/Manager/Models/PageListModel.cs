/*
 * Copyright (c) 2016-2019 Håkan Edling
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
using Piranha.Models;

namespace Piranha.Areas.Manager.Models
{
    public class PageListModel
    {
        public class SiteInfo
        {
            public string Id { get; set; }
            public string Title { get; set; }
            public string Slug { get; set; }
            public bool IsDefault { get; set; }

            /// <summary>
            /// Gets/sets the current sitemap.
            /// </summary>
            public IList<SitemapItem> Sitemap { get; set; } = new List<SitemapItem>();
        }

        /// <summary>
        /// Gets/sets the available page types.
        /// </summary>
        public IList<PageType> PageTypes { get; set; } = new List<PageType>();

        /// <summary>
        /// Gets/sets the current sitemap.
        /// </summary>
        //public IList<SitemapItem> Sitemap { get; set; } = new List<SitemapItem>();

        /// <summary>
        /// Gets/sets the available sites.
        /// </summary>
        /// <returns></returns>
        public IList<SiteInfo> Sites { get; set; } = new List<SiteInfo>();

        /// <summary>
        /// Gets/sets the current site id.
        /// </summary>
        public string SiteId { get; set; }

        /// <summary>
        /// Gets/sets the current site title.
        /// </summary>
        public string SiteTitle { get; set; }

        /// <summary>
        /// Gets/sets if the user should be able
        /// to edit the site content.
        /// </summary>
        //public bool HasSiteContent { get; set; }

        //public Guid SiteContentId { get; set; }

        /// <summary>
        /// Gets/sets the current page id.
        /// </summary>
        public string PageId { get; set; }

        /// <summary>
        /// Gets/sets the expanded levels in the sitemap.
        /// </summary>
        public int ExpandedLevels { get; set; }

        /// <summary>
        /// Gets the page list view model.
        /// </summary>
        /// <param name="api">The current api</param>
        /// <param name="siteId">The optional site id</param>
        /// <param name="pageId">The optional page id</param>
        /// <returns>The model</returns>
        public static PageListModel Get(IApi api, Guid? siteId, string pageId = null)
        {
            var currentSite = siteId.HasValue ? api.Sites.GetById(siteId.Value) : null;
            var defaultSite = api.Sites.GetDefault();

            if (currentSite == null)
            {
                currentSite = defaultSite;
            }

            var model = new PageListModel
            {
                PageId = pageId,
                PageTypes = api.PageTypes.GetAll().ToList(),
                SiteId = currentSite.Id.ToString(),
                SiteTitle = currentSite.Title
            };

            model.Sites = api.Sites.GetAll().Select(s => new SiteInfo
            {
                Id = s.Id.ToString(),
                Title = s.Title,
                Slug = s.Slug,
                IsDefault = s.IsDefault
            }).OrderByDescending(s => s.IsDefault).ThenBy(s => s.Title).ToList();

            foreach (var site in model.Sites)
            {
                site.Sitemap = api.Sites.GetSitemap(new Guid(site.Id), onlyPublished: false);
            }

            using (var config = new Config(api))
            {
                model.ExpandedLevels = config.ManagerExpandedSitemapLevels;
            }
            return model;
        }
    }
}
