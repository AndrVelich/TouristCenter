using System.Collections.Generic;
using System.Linq;
using TouristCenter.Domain.Interfaces.Order.Exceptions;
using TouristCenter.Domain.Interfaces.Order.Managers;
using TouristCenter.Domain.Interfaces.Order.Models;
using TouristCenter.Storage.Interfaces.Order.Managers;

namespace TouristCenter.Domain.Order.Managers
{
    public sealed class OrderManager : IOrderManager
    {
        private readonly IOrderDataManager _orderDataManager;

        public OrderManager(IOrderDataManager orderDataManager)
        {
            _orderDataManager = orderDataManager;
        }

        public IOrder GetOrder(int orderId)
        {
            var orderDataModel = _orderDataManager.GetOrder(orderId);
            if(orderDataModel == null)
            {
                throw new OrderNotFoundException();
            }
            var order = new Models.Order(orderDataModel, _orderDataManager);
            return order;
        }

        public IOrder CreateOrder(
            string name,
            string phone,
            string description)
        {
            var order = new Models.Order(_orderDataManager,
                name,
                phone,
                description);
            return order;
        }

        public IReadOnlyCollection<IOrder> GetOrderCollection(int skip, int take)
        {
            var ordersData = _orderDataManager.GetOrderCollection(skip, take);
            var orders = ordersData.Select(o => new Models.Order(o, _orderDataManager)).ToList();
            return orders;
        }

        public int GetOrdersCount()
        {
            var result = _orderDataManager.GetOrdersCount();
            return result;
        }
    }
}
