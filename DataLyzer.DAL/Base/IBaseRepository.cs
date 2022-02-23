using System.Collections.Generic;
using System.Threading.Tasks;

namespace DataLyzer.DAL.Base
{
    public interface IBaseRepository<T>
    {
        Task<IEnumerable<T>> Get();
        Task<T> Get(string Id);
        Task<IEnumerable<T>> Get(int skip, int limit);
        Task Delete(string Id);
        Task Update(T entity);
        Task<T> Create(T entity);
        Task Activate(string Id);
        Task Deactivate(string Id);
    }
}
