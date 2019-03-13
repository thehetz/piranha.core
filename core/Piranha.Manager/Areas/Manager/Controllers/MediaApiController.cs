/*
 * Copyright (c) 2017 Håkan Edling
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 *
 * https://github.com/piranhacms/piranha.core
 *
 */

using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Piranha.Manager;
using Piranha.Models;
using Piranha.Services;

namespace Piranha.Areas.Manager.Controllers
{
    [Area("Manager")]
    [ApiController]
    [Route("manager/api/media")]
    public class MediaApiController : Controller
    {
        private readonly IApi _api;

        public MediaApiController(IApi api)
        {
            _api = api;
        }

        [Route("list/{folderId:Guid?}")]
        public async Task<Models.MediaApiListModel> GetList(Guid? folderId = null)
        {
            return await Models.MediaApiListModel.Get(_api, folderId);
        }
    }
}