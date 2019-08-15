using System;
using System.IO;
using System.Threading.Tasks;
using EmailSender.Interfaces.Senders;
using EmailSender.Service;
using Microsoft.AspNetCore.Hosting;
using MimeKit;
using Travelx.Domain.Interfaces.Order.Models;

namespace EmailSender.Senders
{
    public sealed class OrderSender : IOrderSender
    {
        private const string id = "{id}";
        private const string name = "{name}";
        private const string phone = "{phone}";
        private const string description = "{description}";
        private const string page = "{page}";
        private const string button = "{button}";
        private const string date = "{date}";

        private readonly IEmailService _emailService;
        private readonly IHostingEnvironment _env;

        public OrderSender(IEmailService emailService, IHostingEnvironment env)
        {
            _emailService = emailService;
            _env = env;
        }

        public async Task SendOrderNotification(IOrder order)
        {
            var webRoot = _env.WebRootPath;
            var pathToFile = webRoot
                             + Path.DirectorySeparatorChar
                             + "EmailTemplates"
                             + Path.DirectorySeparatorChar
                             + "OrderNotification.html";

            var subject = "Новая заявка";

            var builder = new BodyBuilder();
            using (StreamReader SourceReader = System.IO.File.OpenText(pathToFile))
            {
                builder.HtmlBody = SourceReader.ReadToEnd();
            }
            string messageBody = ReplaceTokens(builder.HtmlBody, order);
            await _emailService.SendEmailAsync("andr.velich@gmail.com", subject, messageBody);
        }

        private string ReplaceTokens(string messageBody, IOrder order)
        {
            messageBody = messageBody.Replace(id, order.OrderId.ToString());
            messageBody = messageBody.Replace(name, order.Name);
            messageBody = messageBody.Replace(phone, order.Phone);
            messageBody = messageBody.Replace(description, order.Description);
            messageBody = messageBody.Replace(page, order.Url);
            messageBody = messageBody.Replace(button, order.TourOrButton);
            messageBody = messageBody.Replace(date, order.CreatedDateTime.ToString("{yyyy-MM-dd HH:mm}"));

            return messageBody;
        }
    }
}
