/*
 * Copyright (c) 2018 Håkan Edling
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 *
 * https://github.com/piranhacms/piranha.core
 *
 */

using System;
using Newtonsoft.Json;

namespace Piranha.Extend
{
    /// <summary>
    /// Base class for blocks.
    /// </summary>
    [Serializable]
    public abstract class Block
    {
        /// <summary>
        /// Gets/sets the id of the block instance.
        /// </summary>
        [JsonIgnore]
        public Guid Id { get; set; }

        /// <summary>
        /// Gets/set the block type id.
        /// </summary>
        public string Type { get; set; }
    }
}
