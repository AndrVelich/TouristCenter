using System;
using TouristCenter.Domain.Interfaces.Order.Models;

namespace TouristCenter.Models.Order
{
    public sealed class OrderViewModel
    {
        public int OrderId { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Description { get; set; }
        public bool IsNew { get; set; }
        public DateTime? CreatedDateTime { get; set; }

        public OrderViewModel()
        { }

        public OrderViewModel(IOrder order)
        {
            OrderId = order.OrderId;
            Name = order.Name;
            Phone = order.Phone;
            Description = order.Description;
            IsNew = order.IsNew;
            CreatedDateTime = order.CreatedDateTime;
        }
    }
}
