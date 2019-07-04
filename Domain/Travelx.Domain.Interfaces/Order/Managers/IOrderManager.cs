﻿using System.Collections.Generic;
using Travelx.Domain.Interfaces.Order.Models;

namespace Travelx.Domain.Interfaces.Order.Managers
{
    public interface IOrderManager
    {
        //TODO A.V. need to replace logic to domain model
        IOrder GetOrder(int orderId);
        IOrder CreateOrder(string name,
            string phone,
            string description,
            string url,
            string tourOrButton);
        IReadOnlyCollection<IOrder> GetOrderCollection(int skip, int take);
        bool IsAnyNewOrders();
        int GetOrdersCount();
        void DeletOrder(int orderId);
    }
}
