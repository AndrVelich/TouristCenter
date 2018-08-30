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
                Name = "Tour1Name",
                Description = "Tour 1 Description",
                IsTransferIncluded = true,
                Price = 1200,
                IsHot = false,

                Hotel = new HotelViewModel
                {
                    Name = "Hotel1Name",
                    Description = "Hotel 1 Description",
                    Stars = 4,
                    Country = "Egypt",
                    City = "Hurghada",
                    DistanceToSea = 700,
                    Services = "Бар (3 + 2 бара у бассейна), Игровая комната, Лифт, Магазины, Парикмахерская, Парковка (платно), Прачечная, Ресторан (с разнообразной национальной и европейской кухней), Телевизионная комната, Холл, Сад (Бесплатно)",
                    ChildServices = "Детская площадка, Детская секция в бассейне, Детская мебель",
                    Food = "завтрак",
                    HasPool = true,
                    HasOwnBeach = false,
                    HasInternet = true,

                    ImageIdCollection = new List<string>(),

                    Apartment = new ApartmentViewModel
                    {
                        Conveniences = "Балкон, Ванна/душ, Кондиционер (не во всех номерах - работают с начала июня по середину сентября), Спутниковое телевидение, Телефон, Туалет, Полотенца, Сейф (Платно), Телевизор (Бесплатно), Уборка"
                    }
                }
            };
            var tour2 = new TourViewModel
            {
                Name = "Tour2Name",
                Description = "Tour 2 Description",
                IsTransferIncluded = true,
                Price = 1500,
                IsHot = false,

                Hotel = new HotelViewModel
                {
                    Name = "Hotel2Name",
                    Description = "Hotel 2 Description",
                    Stars = 4,
                    Country = "Turkey",
                    City = "Antalya",
                    DistanceToSea = 700,
                    Services = "Бар (3 + 2 бара у бассейна), Игровая комната, Лифт, Магазины, Парикмахерская, Парковка (платно), Прачечная, Ресторан (с разнообразной национальной и европейской кухней), Телевизионная комната, Холл, Сад (Бесплатно)",
                    ChildServices = "Детская площадка, Детская секция в бассейне, Детская мебель",
                    Food = "завтрак",
                    HasPool = true,
                    HasOwnBeach = false,
                    HasInternet = true,

                    ImageIdCollection = new List<string>(),

                    Apartment = new ApartmentViewModel
                    {
                        Conveniences = "Балкон, Ванна/душ, Кондиционер (не во всех номерах - работают с начала июня по середину сентября), Спутниковое телевидение, Телефон, Туалет, Полотенца, Сейф (Платно), Телевизор (Бесплатно), Уборка"
                    }
                }
            };

            var tourCollection = new List<TourViewModel>();
            tourCollection.Add(tour1);
            tourCollection.Add(tour2);

            return tourCollection;
        }
    }
}
