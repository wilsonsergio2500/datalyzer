using AspNetCore.Identity.MongoDbCore.Models;
using DataLyzer.Models.internals;
using MongoDbGenericRepository.Attributes;
using System;

namespace DataLyzer.Models
{
    [CollectionName(Collections.Roles)]
    public class Role : MongoIdentityRole<Guid>
    {
    }
}
