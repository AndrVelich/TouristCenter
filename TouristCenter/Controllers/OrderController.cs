using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using TouristCenter.Domain.Interfaces.Order.Managers;
using TouristCenter.Models.Order;

namespace TouristCenter.Controllers
{
    public sealed class OrderController : ApiController
    {
        private readonly IOrderManager _orderManager;

        public OrderController(IOrderManager orderManager)
        {
            _orderManager = orderManager;
        }

        [Route("api/ordersPage/{skip}/{take}")]
        public OrdersPage GetOrderCollection(int skip, int take)
        {
            var ordersCount = _orderManager.GetOrdersCount();
            var orders = _orderManager.GetOrderCollection(skip, take);
            var resut = new OrdersPage(ordersCount, orders);

            return resut;
        }

        public void Post(OrderViewModel order)
        {
            CreateOrder(order);
        }

        #region [private]

        private void UpdateOrder(OrderViewModel orderViewModel)
        {
            var order = _orderManager.GetOrder(orderViewModel.OrderId.Value);
            order.Name = orderViewModel.Name;
            order.Phone = orderViewModel.Phone;
            order.Description = orderViewModel.Description;
            order.UpdateOrder();
        }

        private void CreateOrder(OrderViewModel orderViewModel)
        {
            var order = _orderManager.CreateOrder(orderViewModel.Name,
                  orderViewModel.Phone,
                  orderViewModel.Description);
            order.CreateOrder();
        }

        #endregion
    }
}
