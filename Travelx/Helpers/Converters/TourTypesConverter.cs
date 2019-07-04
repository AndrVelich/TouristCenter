using Travelx.Domain.Interfaces.Common.Enums;
using Travelx.Domain.Interfaces.Common.Exceptions;

namespace Travelx.Helpers.Converters
{
    public static class TourTypesConverter
    {
        private const string beach = "beach";
        private const string bus = "bus";
        private const string corporate = "corporate";
        private const string individual = "individual";
        private const string newYear = "newyear";
        private const string skiing = "skiing";

        public static string ConvertToString(TourTypesEnum tourType)
        {
            switch (tourType)
            {
                case TourTypesEnum.Beach:
                    return beach;
                case TourTypesEnum.Bus:
                    return bus;
                case TourTypesEnum.Corporate:
                    return corporate;
                case TourTypesEnum.Individual:
                    return individual;
                case TourTypesEnum.NewYear:
                    return newYear;
                case TourTypesEnum.Skiing:
                    return skiing;
                default: throw new UnknownTourTypeException();
            }
        }

        public static TourTypesEnum ConvertFromString(string tourType)
        {
            tourType = tourType.ToLower();
            switch (tourType)
            {
                case beach:
                    return TourTypesEnum.Beach;
                case bus:
                    return TourTypesEnum.Bus;
                case corporate:
                    return TourTypesEnum.Corporate;
                case individual:
                    return TourTypesEnum.Individual;
                case newYear:
                    return TourTypesEnum.NewYear;
                case skiing:
                    return TourTypesEnum.Skiing;
                default: throw new UnknownTourTypeException();
            }
        }
    }
}