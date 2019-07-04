using System.Collections.Generic;
using System.Linq;
using Travelx.Domain.Interfaces.Order.Models;

namespace Travelx.Models.Order
{
    public sealed class OrdersPage
    {
        public int OrdersCount { get; set; }
        public List<OrderViewModel> OrderCollection { get; set; }

        public OrdersPage()
        { }

        public OrdersPage(int ordersCount, IReadOnlyCollection<IOrder> orderCollection)
        {
            OrdersCount = ordersCount;
            OrderCollection = orderCollection.Select(o => new OrderViewModel(o)).ToList();
        }
    }
}
