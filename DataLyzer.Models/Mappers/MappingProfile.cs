using AutoMapper;
using DataLyzer.Models.DTOs;
using DataLyzer.Models.Entities;

namespace DataLyzer.Models.Mappers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<NewDataSet, DataSet>().ReverseMap();
            CreateMap<NewDatasetReport, DataSetReport>().ReverseMap();
        }
    }
}
