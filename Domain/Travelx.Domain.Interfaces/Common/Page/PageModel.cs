using System.Collections.Generic;

namespace Travelx.Domain.Interfaces.Common.Page
{
    public class PageModel<T> where T : class
    {
        public int Count { get; set; }
        public IReadOnlyCollection<T> Collection { get; set; }

        public PageModel(int count, IReadOnlyCollection<T> collection)
        {
            Count = count;
            Collection = collection;
        }
    }
}
