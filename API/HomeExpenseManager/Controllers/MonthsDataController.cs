using HomeExpenseManager.Data;
using HomeExpenseManager.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HomeExpenseManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MonthsDataController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public MonthsDataController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetListOfMonth")]
        public IActionResult GetListOfMonths()
        {
            var monthlist=(from x in _context.MonthsDate
                           group x by new
                           {
                               monthYear=x.MonthYear,
                               monthNum=x.MonthNumber
                           } into monthGroup
                           orderby monthGroup.Key.monthYear.Length ascending,
                                   monthGroup.Key.monthYear ascending,
                                   monthGroup.Key.monthNum.Length ascending,
                                   monthGroup.Key.monthNum ascending
                                   select monthGroup.Key).ToList();


            return Ok(monthlist);
        }

        [HttpGet("GetTableData")]
        public IActionResult GetTableData(string monthYear, string monthNumber, string tableName)
        {
            var tableData = (from x in _context.MonthsDate
                             where x.MonthYear == monthYear && x.MonthNumber == monthNumber && x.TableName == tableName
                             select new
                             {
                                 id=x.ID,
                                 date = x.Date,
                                 monthYear = x.MonthYear,
                                 name=x.Name,
                                 amount = x.Amount
                             }).ToList();

            return Ok(tableData);
        }

        [HttpPost("InsertTableRow")]
        public IActionResult InsertTableRow(Months month)
        {
            _context.MonthsDate.Add(month);
            _context.SaveChanges();
           var id = _context.MonthsDate.OrderByDescending(p => p.ID).FirstOrDefault().ID;
            return Ok("success");
        }

        [HttpDelete("DeleteTableRow/{id}")]
        public IActionResult DeleteTableRow(int id)
        {
            var data=_context.MonthsDate.Where(x=>x.ID == id).FirstOrDefault();
            _context.MonthsDate.Remove(data);
            _context.SaveChanges();
            return Ok("success");
        }
    }
}
