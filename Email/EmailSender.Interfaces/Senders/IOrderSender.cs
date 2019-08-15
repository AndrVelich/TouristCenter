using System.Threading.Tasks;
using Travelx.Domain.Interfaces.Order.Models;

namespace EmailSender.Interfaces.Senders
{
    public interface IOrderSender
    {
        Task SendOrderNotification(IOrder order);
    }
}
