/*
 * Copyright (c) 2018 Håkan Edling
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 *
 * https://github.com/piranhacms/piranha.core
 *
 */

using Newtonsoft.Json;
using System;

namespace Piranha.Extend
{
    /// <summary>
    /// Base class for blocks.
    /// </summary>
    public abstract class Block
    {
        /// <summary>
        /// Gets/sets the id of the block instance.
        /// </summary>
        [JsonIgnore]
        public Guid Id { get; set; }

        /// <summary>
        /// Gets the list title if the block is used as
        /// an item in a block group.
        /// </summary>
        /// <returns>The title</returns>
        public virtual string GetTitle(IApi api)
        {
            return "[Not Implemented]";
        }
    }
}
