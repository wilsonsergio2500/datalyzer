using AutoMapper;
using DataLyzer.DAL.Repos;
using DataLyzer.Models.DTOs;
using DataLyzer.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DataLyzer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly IMapper autoMapper;
        private readonly IReportRepository reportRepository;
        public ReportController(
            IMapper autoMapper,
            IReportRepository reportRepository
            )
        {
            this.autoMapper = autoMapper;
            this.reportRepository = reportRepository;
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] NewDatasetReport newDatasetReport)
        {
            await reportRepository.Create(autoMapper.Map<DataSetReport>(newDatasetReport));
            return Ok();
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> Get(string Id) 
        {
            DataSetReport item = await reportRepository.Get(Id);
            return Ok(item);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            IEnumerable<DataSetReport> items = await reportRepository.Get();
            return Ok(items);
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> Remove(string Id)
        {
            await reportRepository.Delete(Id);
            return Ok();
        }



    }
}
