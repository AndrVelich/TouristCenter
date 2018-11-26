using System.Collections.Generic;

namespace TouristCenter.Storage.Interfaces.Order.Managers
{
    public interface IOrderDataManager
    {
        Models.Order GetOrder(int orderId);
        IReadOnlyCollection<Models.Order> GetOrderCollection(int skip, int take);
        int GetOrdersCount();
        bool IsAnyNewOrders();
        void UpdateOrder(Models.Order orderDataModel);
        void CreateOrder(Models.Order orderDataModel);
        void DeleteOrder(Models.Order orderDataModed);
    }
}
