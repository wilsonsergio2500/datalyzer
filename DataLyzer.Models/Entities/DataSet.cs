using DataLyzer.Models.Base;
using DataLyzer.Models.internals;
using DataLyzer.Models.Serializers;
using MongoDB.Bson.Serialization.Attributes;
using MongoDbGenericRepository.Attributes;
using System;

namespace DataLyzer.Models.Entities
{
    [CollectionName(Collections.DataSets)]
    public class DataSet : BaseEntity
    {
        public string Name { get; set; }
        public string GeographicCoverage { get; set; }
        public string Source { get; set; }
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime? Update { get; set; }
        public bool HasbeenFetch { get; set; } = false;
        public string ApiPath { get; set; }
        [BsonSerializer(typeof(MongoDynamicSerializer))]
        public dynamic Payload { get; set; }
    }
}
