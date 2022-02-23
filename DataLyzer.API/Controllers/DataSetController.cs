using AutoMapper;
using DataLyzer.DAL.Repos;
using DataLyzer.Models.DTOs;
using DataLyzer.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DataLyzer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataSetController : ControllerBase
    {
        private readonly IMapper autoMapper;
        private readonly IDataSetRepository dataSetRepository;
        public DataSetController(
            IMapper autoMapper,
            IDataSetRepository dataSetRepository
            )
        {
            this.autoMapper = autoMapper;
            this.dataSetRepository = dataSetRepository;
        }
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] NewDataSet dataSet)
        {
            await dataSetRepository.Create(autoMapper.Map<DataSet>(dataSet));
            return Ok();
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> Get(string Id)
        {
            DataSet item = await dataSetRepository.Get(Id);
            return Ok(item);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            IEnumerable<DataSet> items = await dataSetRepository.Get();
            return Ok(items);
        }

        [HttpPut("fetchapi/{Id}")]
        public async Task<IActionResult> FetchApi(string Id)
        {
            await dataSetRepository.FetchApiData(Id);
            return Ok();
        }

        [HttpGet("payload/{Id}")]
        public async Task<IActionResult> GetPayload(string Id)
        {
            DataSet item = await dataSetRepository.Get(Id);
            string payload = JsonConvert.SerializeObject(item.Payload);
            return Content(payload, "application/json");
        }

    }
}
