using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using AccountService.Interfaces.Models;
using EmailSender.Interfaces.Senders;
using EmailSender.Service;
using Microsoft.AspNetCore.Hosting;
using MimeKit;
using Travelx.Domain.Interfaces.Order.Models;

namespace EmailSender.Senders
{
    public sealed class OrderSender : IOrderSender
    {
        private const string idToken = "{id}";
        private const string nameToken = "{name}";
        private const string phoneToken = "{phone}";
        private const string descriptionToken = "{description}";
        private const string pageToken = "{page}";
        private const string buttonToken = "{button}";
        private const string dateToken = "{date}";

        private readonly IEmailService _emailService;
        private readonly IHostingEnvironment _env;

        public OrderSender(IEmailService emailService, IHostingEnvironment env)
        {
            _emailService = emailService;
            _env = env;
        }

        public void SendOrderNotification(IOrder order, IReadOnlyCollection<IApplicationUser> userCollection)
        {
            var webRoot = _env.WebRootPath;
            var pathToFile = webRoot
                             + Path.DirectorySeparatorChar
                             + "EmailTemplates"
                             + Path.DirectorySeparatorChar
                             + "Order"
                             + Path.DirectorySeparatorChar
                             + "OrderNotification.html";

            var subject = "Новая заявка";

            var builder = new BodyBuilder();
            using (StreamReader SourceReader = System.IO.File.OpenText(pathToFile))
            {
                builder.HtmlBody = SourceReader.ReadToEnd();
            }
            string messageBody = ReplaceTokens(builder.HtmlBody, order);

            foreach (var user in userCollection)
            {
                _emailService.SendEmailAsync(user.Email, subject, messageBody);
            }
        }

        private string ReplaceTokens(string messageBody, IOrder order)
        {
            messageBody = messageBody.Replace(idToken, order.OrderId.ToString());
            messageBody = messageBody.Replace(nameToken, order.Name);
            messageBody = messageBody.Replace(phoneToken, order.Phone);
            messageBody = messageBody.Replace(descriptionToken, order.Description);
            messageBody = messageBody.Replace(pageToken, order.Url);
            messageBody = messageBody.Replace(buttonToken, order.TourOrButton);
            messageBody = messageBody.Replace(dateToken, order.CreatedDateTime.ToString("{yyyy-MM-dd HH:mm}"));

            return messageBody;
        }
    }
}
