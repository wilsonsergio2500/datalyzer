using DataLyzer.DAL.Repos;
using Microsoft.Extensions.DependencyInjection;

namespace DataLyzer.DAL
{
    public static class Inject
    {
        public static IServiceCollection AddDataAccesLayer(this IServiceCollection services) 
        {
            services.AddSingleton<IDataSetRepository, DataSetRepository>();
            services.AddSingleton<IReportRepository, ReportRepository>();
            return services;
        }
    }
}
