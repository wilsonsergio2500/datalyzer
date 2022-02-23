namespace DataLyzer.Models.DTOs
{
    public class NewDatasetReport
    {
        public string DatasetId { get; set; }
        public string ReportName { get; set; }
        public string FilterField { get; set; }
        public string FilterValue { get; set; }
        public string CategoryField { get; set; }
        public string SeriesField { get; set; }
        public string ValueField { get; set; }
    }
}
