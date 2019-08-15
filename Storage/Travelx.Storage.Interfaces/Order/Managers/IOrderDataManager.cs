using Travelx.Storage.Interfaces.Common.Filters;
using Travelx.Storage.Interfaces.Common.Page;

namespace Travelx.Storage.Interfaces.Order.Managers
{
    public interface IOrderDataManager
    {
        Models.Order GetOrder(int orderId);
        PageDataModel<Models.Order> GetOrdersPage(DataFilterBase filter);
        bool IsAnyNewOrders();
        void UpdateOrder(Models.Order orderDataModel);
        Models.Order CreateOrder(Models.Order orderDataModel);
        void DeleteOrder(Models.Order orderDataModed);
    }
}
