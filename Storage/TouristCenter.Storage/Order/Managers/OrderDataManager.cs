using System.Data.Entity;
using System.Linq;
using TouristCenter.Storage.Context;
using TouristCenter.Storage.Interfaces.Order.Managers;

namespace TouristCenter.Storage.Order.Managers
{
    public sealed class OrderDataManager : IOrderDataManager
    {
        private readonly TouristCenterContext _dbContext;

        public OrderDataManager(string connectionString)
        {
            _dbContext = new TouristCenterContext(connectionString);
        }

        public Interfaces.Order.Models.Order GetOrder(int orderId)
        {
            var order = _dbContext.Orders.FirstOrDefault(o => o.OrderId == orderId);
            return order;
        }

        public void CreateOrder(Interfaces.Order.Models.Order orderDataModel)
        {
            _dbContext.Orders.Add(orderDataModel);
            _dbContext.SaveChanges();
        }

        public void UpdateOrder(Interfaces.Order.Models.Order orderDataModel)
        {
            _dbContext.Entry(orderDataModel).State = EntityState.Modified;
            _dbContext.SaveChanges();
        }
    }
}
