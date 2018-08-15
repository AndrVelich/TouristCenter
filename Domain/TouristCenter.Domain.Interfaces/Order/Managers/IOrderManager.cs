using TouristCenter.Domain.Interfaces.Order.Models;

namespace TouristCenter.Domain.Interfaces.Order.Managers
{
    public interface IOrderManager
    {
        IOrder GetOrder(int orderId);
        IOrder CreateOrder(string name,
            string phone,
            string description);
    }
}
