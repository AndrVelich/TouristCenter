using System.Linq;
using Microsoft.EntityFrameworkCore;
using Travelx.Storage.Context;
using Travelx.Storage.Interfaces.Common.Filters;
using Travelx.Storage.Interfaces.Common.Page;
using Travelx.Storage.Interfaces.Order.Managers;
using OrderDataModel = Travelx.Storage.Interfaces.Order.Models.Order;

namespace Travelx.Storage.Order.Managers
{
    public sealed class OrderDataManager : IOrderDataManager
    {
        private readonly TravelxContext _dbContext;

        public OrderDataManager(TravelxContext dbContext)
        {
            _dbContext = dbContext;
        }

        public OrderDataModel GetOrder(int orderId)
        {
            var order = _dbContext.Orders.AsNoTracking().FirstOrDefault(o => o.OrderId == orderId);
            return order;
        }

        public PageDataModel<OrderDataModel> GetOrdersPage(DataFilterBase filter)
        {
            var count = _dbContext.Orders.Count();
            var orders = _dbContext.Orders
                .AsNoTracking()
                .OrderByDescending(o => o.CreatedDateTime)
                .Skip(filter.Skip)
                .Take(filter.Take)
                .ToList();
            var result = new PageDataModel<OrderDataModel>(count, orders);

            return result;
        }

        public bool IsAnyNewOrders()
        {
            var result = _dbContext.Orders.Any(o => o.IsNew);
            return result;
        }

        public void CreateOrder(OrderDataModel orderDataModel)
        {
            _dbContext.Orders.Add(orderDataModel);
            _dbContext.SaveChanges();
        }

        public void UpdateOrder(OrderDataModel orderDataModel)
        {
            _dbContext.Entry(orderDataModel).State = EntityState.Modified;
            _dbContext.SaveChanges();
        }

        public void DeleteOrder(OrderDataModel orderDataModel)
        {
            var order = _dbContext.Orders
                .FirstOrDefault(o => o.OrderId == orderDataModel.OrderId);
            if (order != null)
            {
                _dbContext.Orders.Remove(order);
                _dbContext.SaveChanges();
            }
        }
    }
}
