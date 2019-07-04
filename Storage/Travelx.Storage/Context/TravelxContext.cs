using ImageDataModel = Travelx.Storage.Interfaces.Image.Models.Image;
using CountryDataModel = Travelx.Storage.Interfaces.Country.Models.Country;
using OrderDataModel = Travelx.Storage.Interfaces.Order.Models.Order;
using TourDataModel = Travelx.Storage.Interfaces.Tour.Models.Tour;
using PromotionDataModel = Travelx.Storage.Interfaces.Promotion.Models.Promotion;
using Microsoft.EntityFrameworkCore;
using Travelx.Storage.Interfaces.Country.Models;
using Travelx.Storage.Interfaces.Promotion.Models;
using Travelx.Storage.Interfaces.Tour.Models;

namespace Travelx.Storage.Context
{
    public sealed class TravelxContext : DbContext
    {
        private readonly string _connectionString;

        public DbSet<OrderDataModel> Orders { get; set; }
        public DbSet<CountryDataModel> Countries { get; set; }
        public DbSet<TourDataModel> Tours { get; set; }
        public DbSet<PromotionDataModel> Promotions { get; set; }
        public DbSet<ImageDataModel> Images { get; set; }
        public DbSet<CountryImage> CountryImage { get; set; }
        public DbSet<PromotionImage> PromotionImage { get; set; }
        public DbSet<TourImage> TourImage { get; set; }

        public TravelxContext(string connectionString)
        {
            _connectionString = connectionString;
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OrderDataModel>()
                .HasKey(o => o.OrderId);

            modelBuilder.Entity<PromotionDataModel>()
                .HasKey(p => p.PromotionId);

            modelBuilder.Entity<TourDataModel>()
                .HasKey(t => t.TourId);


            modelBuilder.Entity<CountryImage>().HasKey(ci => new { ci.CountryId, ci.ImageId });

            modelBuilder.Entity<CountryImage>()
                .HasOne(ci => ci.Country)
                .WithMany(c => c.CountryImages)
                .HasForeignKey(sc => sc.CountryId);

            modelBuilder.Entity<CountryImage>()
                .HasOne(ci => ci.Image)
                .WithMany(i => i.CountryImages)
                .HasForeignKey(ci => ci.ImageId);


            modelBuilder.Entity<TourImage>().HasKey(ti => new { ti.TourId, ti.ImageId });

            modelBuilder.Entity<TourImage>()
                .HasOne(ti => ti.Tour)
                .WithMany(t => t.TourImages)
                .HasForeignKey(ti => ti.TourId);

            modelBuilder.Entity<TourImage>()
                .HasOne(ti => ti.Image)
                .WithMany(i => i.TourImages)
                .HasForeignKey(ti => ti.ImageId);


            modelBuilder.Entity<PromotionImage>().HasKey(pi => new { pi.PromotionId, pi.ImageId });

            modelBuilder.Entity<PromotionImage>()
                .HasOne(pi => pi.Promotion)
                .WithMany(p => p.PromotionImages)
                .HasForeignKey(pi => pi.PromotionId);

            modelBuilder.Entity<PromotionImage>()
                .HasOne(pi => pi.Image)
                .WithMany(i => i.PromotionImages)
                .HasForeignKey(pi => pi.ImageId);
        }   
    }
}
