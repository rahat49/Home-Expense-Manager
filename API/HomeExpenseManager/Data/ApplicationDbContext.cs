using HomeExpenseManager.Models;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace HomeExpenseManager.Data
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions options): base(options)
        {
            
        }
        public DbSet<Months> MonthsDate {  get; set; }
    }
}
