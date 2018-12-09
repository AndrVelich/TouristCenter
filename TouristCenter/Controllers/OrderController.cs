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

        [HttpGet]
        [Authorize]
        [Route("api/orders/isAnyNew")]
        public bool isAnyNewOrders()
        {
            var result = _orderManager.IsAnyNewOrders();
            return result;
        }

        [HttpGet]
        [Authorize]
        [Route("api/ordersPage/{skip}/{take}")]
        public OrdersPage GetOrderCollection(int skip, int take)
        {
            var ordersCount = _orderManager.GetOrdersCount();
            var orders = _orderManager.GetOrderCollection(skip, take);
            var resut = new OrdersPage(ordersCount, orders);

            return resut;
        }

        public void Post(OrderViewModel orderViewModel)
        {
            var order = _orderManager.CreateOrder(orderViewModel.Name,
                  orderViewModel.Phone,
                  orderViewModel.Description,
                  orderViewModel.Url,
                  orderViewModel.TourOrButton);
            order.CreateOrder();
        }

        [Authorize]
        public void Put(OrderViewModel orderViewModel)
        {
            var order = _orderManager.GetOrder(orderViewModel.OrderId);
            order.Name = orderViewModel.Name;
            order.Phone = orderViewModel.Phone;
            order.Description = orderViewModel.Description;
            order.IsNew = orderViewModel.IsNew;
            order.UpdateOrder();
        }

        [Authorize]
        [HttpDelete]
        [Route("api/order/{id}")]
        public void Delete(int id)
        {
            _orderManager.DeletOrder(id);
        }

    }
}
