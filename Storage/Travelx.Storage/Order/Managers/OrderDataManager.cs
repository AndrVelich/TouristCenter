using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Travelx.Storage.Context;
using Travelx.Storage.Interfaces.Order.Managers;

namespace Travelx.Storage.Order.Managers
{
    public sealed class OrderDataManager : IOrderDataManager
    {
        private readonly TravelxContext _dbContext;

        public OrderDataManager(TravelxContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Interfaces.Order.Models.Order GetOrder(int orderId)
        {
            var order = _dbContext.Orders.AsNoTracking().FirstOrDefault(o => o.OrderId == orderId);
            return order;
        }

        public IReadOnlyCollection<Interfaces.Order.Models.Order> GetOrderCollection(int skip, int take)
        {
            var orders = _dbContext.Orders.AsNoTracking().OrderByDescending(o => o.CreatedDateTime)
                .Skip(skip)
                .Take(take)
                .ToList();

            return orders;
        }

        public int GetOrdersCount()
        {
            var result = _dbContext.Orders.Count();
            return result;
        }

        public bool IsAnyNewOrders()
        {
            var result = _dbContext.Orders.Any(o => o.IsNew);
            return result;
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

        public void DeleteOrder(Interfaces.Order.Models.Order orderDataModel)
        {
            var order = _dbContext.Orders
                .FirstOrDefault(o => o.OrderId == orderDataModel.OrderId);
            _dbContext.Orders.Remove(order);

            _dbContext.SaveChanges();
        }
    }
}
