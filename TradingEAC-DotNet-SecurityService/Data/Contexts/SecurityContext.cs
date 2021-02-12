using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TradingEAC.DotNet.SecurityService.Data.Entities;

namespace TradingEAC.DotNet.SecurityService.Data.Contexts
{
    public class SecurityContext: DbContext
    {
        public DbSet<User> Users { get; set; }

        public SecurityContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {           
            modelBuilder.Entity<User>()
                .ToContainer("Users")
                .HasNoDiscriminator()
                .HasPartitionKey(o => o.userName)
                .HasKey(o => o.id);
        }
    }
}
