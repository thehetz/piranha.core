/*
 * Copyright (c) 2019 Håkan Edling
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 *
 * https://github.com/piranhacms/piranha.core
 *
 */

namespace Piranha.Runtime
{
    /// <summary>
    /// Information about a field used in a content instance.
    /// </summary>
    public class AppFieldReference
    {
        /// <summary>
        /// Gets/sets the display name.
        /// </summary>
        public string DisplayName { get; set; }

        /// <summary>
        /// Gets/sets the property name of the field.
        /// </summary>
        public string PropertyName { get; set; }
    }
}