using System.Linq;
using Travelx.Domain.Interfaces.Common.Filters;
using Travelx.Domain.Interfaces.Common.Page;
using Travelx.Domain.Interfaces.Order.Exceptions;
using Travelx.Domain.Interfaces.Order.Managers;
using Travelx.Domain.Interfaces.Order.Models;
using Travelx.Storage.Interfaces.Common.Filters;
using Travelx.Storage.Interfaces.Order.Managers;

namespace Travelx.Domain.Order.Managers
{
    public sealed class OrderManager : IOrderManager
    {
        private readonly IOrderDataManager _orderDataManager;

        public OrderManager(IOrderDataManager orderDataManager)
        {
            _orderDataManager = orderDataManager;
        }

        //TODO need to move logic to domain model

        public IOrder GetOrder(int orderId)
        {
            var orderDataModel = _orderDataManager.GetOrder(orderId);
            if (orderDataModel == null)
            {
                throw new OrderNotFoundException();
            }
            var order = new Models.Order(orderDataModel, _orderDataManager);
            return order;
        }

        public IOrder CreateOrder(
            string name,
            string phone,
            string description,
            string url,
            string tourOrButton)
        {
            var order = new Models.Order(_orderDataManager,
                name,
                phone,
                description,
                url,
                tourOrButton);
            return order;
        }

        public bool IsAnyNewOrders()
        {
            var result = _orderDataManager.IsAnyNewOrders();
            return result;
        }

        public void DeletOrder(int orderId)
        {
            var orderDataModel = _orderDataManager.GetOrder(orderId);
            if (orderDataModel == null)
            {
                throw new OrderNotFoundException();
            }
            _orderDataManager.DeleteOrder(orderDataModel);
        }

        public PageModel<IOrder> GetOrdersPage(FilterBase filter)
        {
            var dataFilter = new DataFilterBase
            {
                Skip = filter.Skip,
                Take = filter.Take
            };
            var ordersPageData = _orderDataManager.GetOrdersPage(dataFilter);
            var ordersPageCollection = ordersPageData.Collection.Select(o => new Models.Order(o, _orderDataManager)).ToList();
            var result = new PageModel<IOrder>(ordersPageData.Count, ordersPageCollection);

            return result;
        }
    }
}
