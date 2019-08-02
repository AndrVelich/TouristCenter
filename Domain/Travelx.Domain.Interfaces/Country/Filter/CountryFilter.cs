using Travelx.Domain.Interfaces.Common.Enums;
using Travelx.Domain.Interfaces.Common.Filters;

namespace Travelx.Domain.Interfaces.Country.Filter
{
    public sealed class CountryFilter : FilterBase
    {
        public TourTypesEnum? TourType { get; set; }

        public CountryFilter(int skip, int take) :base(skip, take)
        {
            
        }
    }
}
