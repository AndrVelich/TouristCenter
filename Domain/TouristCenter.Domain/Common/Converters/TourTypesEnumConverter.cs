using TouristCenter.Domain.Interfaces.Common.Enums;
using TouristCenter.Domain.Interfaces.Common.Exceptions;

namespace TouristCenter.Domain.Common.Converters
{
    public static class TourTypesEnumConverter
    {
        private const string beach = "beach";
        private const string bus = "bus";
        private const string corporate = "corporate";
        private const string individual = "individual";
        private const string newYear = "newYear";
        private const string skiing = "skiing";

        public static string ConvertToDbValue(TourTypesEnum tourType)
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

        public static TourTypesEnum ConvertToDomainValue(string tourType)
        {
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
