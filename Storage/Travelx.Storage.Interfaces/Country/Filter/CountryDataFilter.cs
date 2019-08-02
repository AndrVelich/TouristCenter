using Travelx.Storage.Interfaces.Common.Filters;

namespace Travelx.Storage.Interfaces.Country.Filter
{
    public sealed class CountryDataFilter : DataFilterBase
    {
        public string TourType { get; set; }
    }
}
