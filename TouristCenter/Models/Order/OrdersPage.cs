using System.Collections.Generic;
using System.Linq;
using TouristCenter.Domain.Interfaces.Order.Models;

namespace TouristCenter.Models.Order
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
