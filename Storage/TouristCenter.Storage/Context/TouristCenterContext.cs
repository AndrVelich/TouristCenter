using System.Data.Entity;

namespace TouristCenter.Storage.Context
{
    internal sealed class TouristCenterContext : DbContext
    {
        public DbSet<Interfaces.Order.Models.Order> Orders { get; set; }
        public DbSet<Interfaces.Tour.Models.Tour> Tours { get; set; }
        public DbSet<Interfaces.Tour.Models.Hotel> Hotels { get; set; }
        public DbSet<Interfaces.Tour.Models.Apartment> Apartments { get; set; }

        internal TouristCenterContext(string connection)
            : base(connection)
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Interfaces.Order.Models.Order>()
                .HasKey(o => o.OrderId);
            modelBuilder.Entity<Interfaces.Tour.Models.Tour>()
                .HasKey(o => o.TourId);
            modelBuilder.Entity<Interfaces.Tour.Models.Hotel>()
                .HasKey(o => o.HotelId);
            modelBuilder.Entity<Interfaces.Tour.Models.Apartment>()
                .HasKey(o => o.ApartmentId);


        }
    }
}
