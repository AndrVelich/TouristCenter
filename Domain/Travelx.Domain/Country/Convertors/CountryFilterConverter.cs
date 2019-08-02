using Travelx.Domain.Common.Converters;
using Travelx.Domain.Interfaces.Country.Filter;
using Travelx.Storage.Interfaces.Country.Filter;

namespace Travelx.Domain.Country.Convertors
{
    public static class CountryFilterConverter
    {
        public static CountryDataFilter ConvertToDbValue(CountryFilter tourFilter)
        {
            CountryDataFilter result = new CountryDataFilter
            {
                Skip = tourFilter.Skip,
                Take = tourFilter.Take,
                TourType = tourFilter.TourType.HasValue ? TourTypesEnumConverter.ConvertToDbValue(tourFilter.TourType.Value) : null
            };

            return result;
        }
    }
}
