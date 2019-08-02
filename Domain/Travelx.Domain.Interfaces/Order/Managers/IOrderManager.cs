using Travelx.Domain.Interfaces.Common.Filters;
using Travelx.Domain.Interfaces.Common.Page;
using Travelx.Domain.Interfaces.Order.Models;

namespace Travelx.Domain.Interfaces.Order.Managers
{
    public interface IOrderManager
    {
        IOrder GetOrder(int orderId);
        IOrder CreateOrder(string name,
            string phone,
            string description,
            string url,
            string tourOrButton);

        PageModel<IOrder> GetOrdersPage(FilterBase filter);
        bool IsAnyNewOrders();
        void DeletOrder(int orderId);
    }
}
