using System.Linq;
using AccountService.Interfaces.Managers;
using EmailSender.Interfaces.Senders;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Travelx.Domain.Interfaces.Common.Filters;
using Travelx.Domain.Interfaces.Order.Managers;
using Travelx.Models.Common.Page;
using Travelx.Models.Order;

namespace Travelx.Controllers
{
    public sealed class OrderController : Controller
    {
        private readonly IOrderManager _orderManager;
        private readonly IUserManager _userManager;
        private readonly IOrderSender _orderSender;

        public OrderController(IOrderManager orderManager, IOrderSender orderSender, IUserManager userManager)
        {
            _orderManager = orderManager;
            _orderSender = orderSender;
            _userManager = userManager;
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
        [Route("api/orders")]
        public PageViewModel<OrderViewModel> GetOrderCollection(int skip, int take)
        {
            var filter = new FilterBase(skip, take);
            var ordersPage = _orderManager.GetOrdersPage(filter);
            var ordersPageCollection = ordersPage.Collection.Select(o => new OrderViewModel(o))
                .ToList();
            var resut = new PageViewModel<OrderViewModel>(ordersPage.Count, ordersPageCollection);

            return resut;
        }

        [HttpPost]
        [Route("api/order")]
        public void Post([FromBody]OrderViewModel orderViewModel)
        {
            var users = _userManager.GetUsersNotificationEnabled();
            var order = _orderManager.CreateOrder(orderViewModel.Name,
                  orderViewModel.Phone,
                  orderViewModel.Description,
                  orderViewModel.Url,
                  orderViewModel.TourOrButton);
            order.CreateOrder();

            _orderSender.SendOrderNotification(order, users);
        }

        [Authorize]
        [HttpPut]
        [Route("api/order")]
        public void Put([FromBody]OrderViewModel orderViewModel)
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
