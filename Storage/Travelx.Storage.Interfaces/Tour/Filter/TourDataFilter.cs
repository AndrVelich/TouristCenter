using Travelx.Storage.Interfaces.Common.Filters;

namespace Travelx.Storage.Interfaces.Tour.Filter
{
    public sealed class TourDataFilter : DataFilterBase
    {
        public string TourType { get; set; }
        public string CountryUrl { get; set; }
    }
}
