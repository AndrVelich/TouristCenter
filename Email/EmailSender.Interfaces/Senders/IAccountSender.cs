using AccountService.Interfaces.Models;
using System.Threading.Tasks;

namespace EmailSender.Interfaces.Senders
{
    public interface IAccountSender
    {
        Task SendRegistrationConfirmation(IApplicationUser user, string url);
    }
}
