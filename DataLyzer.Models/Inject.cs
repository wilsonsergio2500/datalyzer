using DataLyzer.Models.Mappers;
using Microsoft.Extensions.DependencyInjection;

namespace DataLyzer.Models
{
    public static class Inject
    {
        public static IServiceCollection AddAutoMappings(this IServiceCollection services) 
        {
            services.AddAutoMapper(typeof(MappingProfile));
            return services;
        }
    }
}
