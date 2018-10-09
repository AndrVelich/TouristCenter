using System;

namespace TouristCenter.Domain.Interfaces.Order.Models
{
    public interface IOrder
    {
        int OrderId { get; }
        string Name { get; set; }
        string Phone { get; set; }
        string Description { get; set; }
        DateTime CreatedDateTime { get; }

        void CreateOrder();
        void UpdateOrder();
    }
}
