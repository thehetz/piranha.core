/*
 * Copyright (c) 2019 Chris Hetzler
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 * 
 * http://github.com/piranhacms/piranha
 * 
 */

using System;
using System.Threading.Tasks;

namespace Piranha.AspNetCore.Identity.AAD
{
    /// <summary>
    /// Default Constructor.
    /// </summary>
    public class IdentityAad : ISecurity
    {
        public Task<bool> SignIn(object context, string username, string password)
        {
            throw new NotImplementedException();
        }

        public Task SignOut(object context)
        {
            throw new NotImplementedException();
        }
    }
}
