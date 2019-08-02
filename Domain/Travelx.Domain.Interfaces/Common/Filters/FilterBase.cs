namespace Travelx.Domain.Interfaces.Common.Filters
{
    public class FilterBase
    {
        public int Skip { get; set; }
        public int Take { get; set; }

        public FilterBase(int skip, int take)
        {
            Skip = skip;
            Take = take;
        }
    }
}
