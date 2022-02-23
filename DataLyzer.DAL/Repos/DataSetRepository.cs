using AspNetCore.Identity.MongoDbCore.Infrastructure;
using DataLyzer.DAL.Base;
using DataLyzer.Models.Entities;
using Flurl.Http;
using System;
using System.Threading.Tasks;

namespace DataLyzer.DAL.Repos
{
    public class DataSetRepository : BaseRepository<DataSet>, IDataSetRepository
    {
        public DataSetRepository(MongoDbSettings mongoDbSettings) : base(mongoDbSettings)
        {
        }

        public async Task FetchApiData(string Id) 
        {
            DataSet dataSet = await Get(Id);
            if (dataSet != null) 
            {
                string response = await dataSet.ApiPath.GetStringAsync();
                dataSet.Update = DateTime.Now;
                dataSet.Payload = response;
                dataSet.HasbeenFetch = true;
                await Update(dataSet);
            }
        }
        
    }
}
