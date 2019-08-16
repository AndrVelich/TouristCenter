using System.Collections.Generic;
using AccountService.Interfaces.Models;
using Travelx.Domain.Interfaces.Order.Models;

namespace EmailSender.Interfaces.Senders
{
    public interface IOrderSender
    {
        void SendOrderNotification(IOrder order, IReadOnlyCollection<IApplicationUser> users);
    }
}
