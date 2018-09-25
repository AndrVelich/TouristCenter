using System.Data.Entity;
using ImageDataModel = TouristCenter.Storage.Interfaces.Image.Models.Image;
using CountryDataModel = TouristCenter.Storage.Interfaces.Country.Models.Country;
using OrderDataModel = TouristCenter.Storage.Interfaces.Order.Models.Order;

namespace TouristCenter.Storage.Context
{
    internal sealed class TouristCenterContext : DbContext
    {
        public DbSet<OrderDataModel> Orders { get; set; }
        public DbSet<CountryDataModel> Countries { get; set; }
        public DbSet<ImageDataModel> Images { get; set; }

        internal TouristCenterContext(string connection)
            : base(connection)
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OrderDataModel>()
                .HasKey(o => o.OrderId);

            modelBuilder.Entity<CountryDataModel>()
                .HasKey(o => o.CountryId);

            modelBuilder.Entity<CountryDataModel>()
                .HasMany(c => c.Images)
                .WithMany(i => i.Countries)
                .Map(ci =>
                {
                    ci.MapLeftKey("CountryId");
                    ci.MapRightKey("ImageId");
                    ci.ToTable("CountryImage");
                });
        }   
    }
}
