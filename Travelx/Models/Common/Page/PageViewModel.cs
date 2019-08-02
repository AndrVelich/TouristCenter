using System.Collections.Generic;

namespace Travelx.Models.Common.Page
{
    public class PageViewModel<T> where T : class
    {
        public int Count { get; set; }
        public IReadOnlyCollection<T> Collection { get; set; }

        public PageViewModel(int count, IReadOnlyCollection<T> collection)
        {
            Count = count;
            Collection = collection;
        }
    }
}
