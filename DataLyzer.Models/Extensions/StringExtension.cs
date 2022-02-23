using MongoDB.Bson;
using MongoDB.Bson.IO;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;
using System;

namespace DataLyzer.Models.Extensions
{
    internal static class StringExtension
    {
        public static BsonArray FromJsonToBsonArray(this string json)
        {
            using (JsonReader jsonReader = new JsonReader(json))
            {
                BsonArraySerializer serializer = new BsonArraySerializer();
                BsonArray bsonArray = serializer.Deserialize(BsonDeserializationContext.CreateRoot(jsonReader));
                return bsonArray;
            }
        }

        public static string TrimEndOfLineWhenAny(this string value)
        {
            return value.Trim().TrimEnd(Environment.NewLine.ToCharArray());
        }
    }
}
