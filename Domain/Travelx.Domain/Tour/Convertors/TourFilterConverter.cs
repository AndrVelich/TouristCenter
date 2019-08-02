using Travelx.Domain.Common.Converters;
using Travelx.Domain.Interfaces.Tour.Filter;
using Travelx.Storage.Interfaces.Tour.Filter;

namespace Travelx.Domain.Tour.Convertors
{
    public static class TourFilterConverter
    {
        public static TourDataFilter ConvertToDbValue(TourFilter tourFilter)
        {
            TourDataFilter result = new TourDataFilter
            {
                Skip = tourFilter.Skip,
                Take = tourFilter.Take,
                TourType = tourFilter.TourType.HasValue ? TourTypesEnumConverter.ConvertToDbValue(tourFilter.TourType.Value) : null
            };

            return result;
        }
    }
}
