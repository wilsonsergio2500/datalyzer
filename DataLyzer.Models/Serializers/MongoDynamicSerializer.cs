using DataLyzer.Models.Extensions;
using MongoDB.Bson;
using MongoDB.Bson.IO;
using MongoDB.Bson.Serialization;
using Newtonsoft.Json.Linq;
using System;

namespace DataLyzer.Models.Serializers
{
    public class MongoDynamicSerializer : IBsonSerializer
    {
        public Type ValueType => typeof(object);

        public object Deserialize(BsonDeserializationContext context, BsonDeserializationArgs args)
        {
            IBsonReader bsonReader = context.Reader;
            object document;
            dynamic output;
            Type type;
            var currentBsonType = bsonReader.GetCurrentBsonType();

            switch (currentBsonType)
            {
                case BsonType.Document:
                    type = typeof(BsonDocument);
                    document = BsonSerializer.Deserialize(bsonReader, type) as BsonDocument;
                    output = JObject.Parse(document.ToJson(type));
                    break;
                case BsonType.Array:
                    type = typeof(BsonArray);
                    document = BsonSerializer.Deserialize(bsonReader, type) as BsonArray;
                    output = JArray.Parse(document.ToJson(type));
                    break;
                default:
                    throw new ApplicationException(string.Format("Invalid type {0}", currentBsonType));
            }

            return output;
        }

        public void Serialize(BsonSerializationContext context, BsonSerializationArgs args, object value)
        {
            IBsonWriter bsonWriter = context.Writer;

            try
            {
                BsonArray array = value.ToString().FromJsonToBsonArray();
                BsonSerializer.Serialize(bsonWriter, typeof(BsonArray), array);
                return;
            }
            catch 
            {

                BsonDocument document = BsonDocument.Parse(value?.ToString() ?? "{}");
                BsonSerializer.Serialize(bsonWriter, typeof(BsonDocument), document);
            }
        }
    }
}
