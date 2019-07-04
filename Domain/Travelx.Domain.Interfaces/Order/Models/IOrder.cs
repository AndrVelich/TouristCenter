using System;

namespace Travelx.Domain.Interfaces.Order.Models
{
    public interface IOrder
    {
        int OrderId { get; }
        string Name { get; set; }
        string Phone { get; set; }
        string Description { get; set; }
        bool IsNew { get; set; }
        DateTime CreatedDateTime { get; }
        string Url { get; set; }
        string TourOrButton { get; set; }

        void CreateOrder();
        void UpdateOrder();
    }
}
