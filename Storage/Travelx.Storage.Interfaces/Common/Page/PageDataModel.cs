using System.Collections.Generic;

namespace Travelx.Storage.Interfaces.Common.Page
{
    public class PageDataModel<T> where T : class
    {
        public int Count { get; set; }
        public IReadOnlyCollection<T> Collection { get; set; }

        public PageDataModel(int count, IReadOnlyCollection<T> collection)
        {
            Count = count;
            Collection = collection;
        }
    }
}
