using Travelx.Domain.Interfaces.Common.Enums;
using Travelx.Domain.Interfaces.Common.Filters;

namespace Travelx.Domain.Interfaces.Tour.Filter
{
    public sealed class TourFilter : FilterBase
    {
        public TourTypesEnum? TourType { get; set; }
        public string CountryUrl { get; set; }

        public TourFilter(int skip, int take) :base(skip, take)
        {
            
        }
    }
}
