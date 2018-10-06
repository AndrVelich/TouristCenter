using System.Data.Entity;
using ImageDataModel = TouristCenter.Storage.Interfaces.Image.Models.Image;
using CountryDataModel = TouristCenter.Storage.Interfaces.Country.Models.Country;
using OrderDataModel = TouristCenter.Storage.Interfaces.Order.Models.Order;
using TourDataModel = TouristCenter.Storage.Interfaces.Tour.Models.Tour;
using PromotionDataModel = TouristCenter.Storage.Interfaces.Promotion.Models.Promotion;

namespace TouristCenter.Storage.Context
{
    public class TouristCenterContext : DbContext
    {
        public DbSet<OrderDataModel> Orders { get; set; }
        public DbSet<CountryDataModel> Countries { get; set; }
        public DbSet<ImageDataModel> Images { get; set; }
        public DbSet<TourDataModel> Tours { get; set; }
        public DbSet<PromotionDataModel> Promotions { get; set; }

        public TouristCenterContext()
            : base("DefaultConnection")
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<TouristCenterContext, Migrations.Configuration>());
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OrderDataModel>()
                .HasKey(o => o.OrderId);

            modelBuilder.Entity<PromotionDataModel>()
                .HasKey(p => p.PromotionId);

            modelBuilder.Entity<TourDataModel>()
                .HasKey(t => t.TourId)
                .HasMany(t => t.Images)
                .WithMany(i => i.Tours)
                .Map(ci =>
                {
                    ci.MapLeftKey("TourId");
                    ci.MapRightKey("ImageId");
                    ci.ToTable("TourImage");
                });

            modelBuilder.Entity<CountryDataModel>()
                .HasKey(o => o.CountryId)
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
