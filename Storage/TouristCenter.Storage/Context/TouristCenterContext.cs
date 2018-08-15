using System.Data.Entity;

namespace TouristCenter.Storage.Context
{
    internal sealed class TouristCenterContext : DbContext
    {
        public DbSet<Interfaces.Order.Models.Order> Orders { get; set; }

        internal TouristCenterContext(string connection)
            : base(connection)
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Interfaces.Order.Models.Order>()
                .HasKey(o => o.OrderId);

        }
    }
}
