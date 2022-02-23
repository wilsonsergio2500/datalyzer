using DataLyzer.DAL.Base;
using DataLyzer.Models.Entities;
using System.Threading.Tasks;

namespace DataLyzer.DAL.Repos
{
    public interface IDataSetRepository : IBaseRepository<DataSet>
    {
        Task FetchApiData(string Id);
    }
}
