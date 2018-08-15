namespace TouristCenter.Storage.Interfaces.Order.Managers
{
    public interface IOrderDataManager
    {
        Models.Order GetOrder(int orderId);
        void UpdateOrder(Models.Order orderDataModel);
        void CreateOrder(Models.Order orderDataModel);
    }
}
