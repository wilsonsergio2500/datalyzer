using AspNetCore.Identity.MongoDbCore.Infrastructure;
using DataLyzer.DAL.Base;
using DataLyzer.Models.Entities;

namespace DataLyzer.DAL.Repos
{
    public class ReportRepository : BaseRepository<DataSetReport>, IReportRepository
    {
        public ReportRepository(MongoDbSettings mongoDbSettings) : base(mongoDbSettings)
        {
        }
    }
}
