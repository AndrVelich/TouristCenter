using Microsoft.AspNet.Identity;
using System.Threading.Tasks;

namespace AccountService.Models
{
    internal class EmailService : IIdentityMessageService
    {
        public Task SendAsync(IdentityMessage message)
        {
            // Подключите здесь службу почты для отправки сообщения.
            return Task.FromResult(0);
        }
    }
}
