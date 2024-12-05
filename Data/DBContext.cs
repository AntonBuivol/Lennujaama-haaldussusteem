using Lennujaama_haaldussusteem.Models;
using Microsoft.EntityFrameworkCore;

namespace Lennujaama_haaldussusteem.Data
{
    public class DBContext : DbContext
    {
        public DbSet<Kasutajad> Kasutajad { get; set; }
        public DbSet<Lennujaamad> Lennujaamad { get; set; }
        public DbSet<Piletid> Piletid { get; set; }

        public DBContext(DbContextOptions<DBContext> options) : base(options)
        {

        }
    }
}