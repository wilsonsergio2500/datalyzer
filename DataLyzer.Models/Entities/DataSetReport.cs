using DataLyzer.Models.Base;
using DataLyzer.Models.internals;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDbGenericRepository.Attributes;

namespace DataLyzer.Models.Entities
{
    [CollectionName(Collections.DataSetReports)]
    public class DataSetReport: BaseEntity
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string DatasetId { get; set; }
        public string ReportName { get; set; }
        public string FilterField { get; set; }
        public string FilterValue { get; set; }
        public string CategoryField { get; set; }
        public string SeriesField { get; set; }
        public string ValueField { get; set; }
    }
}
