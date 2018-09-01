using System.Collections.Generic;
using System.Web.Http;
using TouristCenter.Models.Tour;

namespace TouristCenter.Controllers
{
    public class TourController : ApiController
    {
        //private readonly ITourManager _tourManager;

        public TourController(/*ITourManager tourManager*/)
        {
            //_tourManager = tourManager;
        }

        public List<TourViewModel> Get()
        {
            var tour1 = new TourViewModel
            {
                Name = "Hotel1Name",
                Description1 = "Hotel 1 Description",
                Description2 = "Hotel 2 Description",
                Description3 = "Hotel 3 Description",
                Stars = 4,
                Country = "Egypt",
                City = "Hurghada",
                Price = 1200,
                DaysCount = 7,
                IsTransferIncluded = true,

                ImageIdCollection = new List<string>(),
            };
            var tour2 = new TourViewModel
            {
                Name = "Hotel2Name",
                Description1 = "Hotel 21 Description",
                Description2 = "Hotel 22 Description",
                Description3 = "Hotel 23 Description",
                Stars = 4,
                Country = "Egypt2",
                City = "Hurghada2",
                Price = 2000,
                DaysCount = 8,
                IsTransferIncluded = true,

                ImageIdCollection = new List<string>(),
            
            };

            var tourCollection = new List<TourViewModel>();
            tourCollection.Add(tour1);
            tourCollection.Add(tour2);

            return tourCollection;
        }
    }
}
