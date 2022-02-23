using AspNetCore.Identity.MongoDbCore.Infrastructure;
using MongoDbGenericRepository.Attributes;
using DataLyzer.DAL.Helpers;
using DataLyzer.Models.Base;
using MongoDB.Driver;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;

namespace DataLyzer.DAL.Base
{
    public abstract class BaseRepository<T> : IBaseRepository<T> where T: BaseEntity, new()
    {
        private readonly IMongoCollection<T> collection;
        public BaseRepository(MongoDbSettings mongoDbSettings)
        {
            MongoClient mongoClient = new MongoClient(mongoDbSettings.ConnectionString);
           IMongoDatabase database = mongoClient.GetDatabase(mongoDbSettings.DatabaseName);
            string collectionName = AttributeFinder.GetAttributeValue<T, CollectionNameAttribute, string>(z => z.Name);
            collection = database.GetCollection<T>(collectionName);
        }

        private FilterDefinition<T> filter(string Id) => Builders<T>.Filter.Eq(g => g.Id, Id);

        public virtual async Task<IEnumerable<T>> Get()
        {
            FilterDefinition<T> filter = Builders<T>.Filter.Empty;
            return await collection.Find(filter).ToListAsync<T>();
        }
        public virtual async Task<T> Get(string Id) 
        {
            T item = default(T);
            item = await collection.Find(filter(Id)).SingleAsync();
            return item;
        }
        public virtual async Task<IEnumerable<T>> Get(int skip, int limit) 
        {
            List<T> items = await collection.Find(Builders<T>.Filter.Empty).SortByDescending(g => g.CreatedDate).Skip(skip).Limit(limit).ToListAsync<T>();
            return items;
        }
        public virtual async Task Delete(string Id)
        {
            await collection.FindOneAndDeleteAsync(filter(Id));
        }
        public virtual async Task Update(T entity) 
        {
            await collection.ReplaceOneAsync(filter(entity.Id), entity);
        }

        public virtual async Task<T> Create(T entity)
        {
            entity.CreatedDate = DateTime.Now;
            await collection.InsertOneAsync(entity);
            return await Get(entity.Id);
        }

        public virtual async Task Activate(string Id)
        {
            UpdateDefinition<T> update = Builders<T>.Update.Set(k => k.Active, true);
            await collection.UpdateOneAsync(filter(Id), update);
        }

        public virtual async Task Deactivate(string Id)
        {
            UpdateDefinition<T> update = Builders<T>.Update.Set(k => k.Active, false);
            await collection.UpdateOneAsync(filter(Id), update);
        }


       

    }
}
