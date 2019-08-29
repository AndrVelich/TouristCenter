using System.IO;
using System.Threading.Tasks;
using AccountService.Interfaces.Models;
using EmailSender.Interfaces.Senders;
using EmailSender.Service;
using Microsoft.AspNetCore.Hosting;
using MimeKit;

namespace EmailSender.Senders
{
    public sealed class AccountSender : IAccountSender
    {
        private const string firstNameToken = "{firstName}";
        private const string lastNameToken = "{lastName}";
        private const string urlToken = "{url}";

        private readonly IEmailService _emailService;
        private readonly IHostingEnvironment _env;

        public AccountSender(IEmailService emailService, IHostingEnvironment env)
        {
            _emailService = emailService;
            _env = env;
        }

        public async Task SendRegistrationConfirmation(IApplicationUser user, string url)
        {
            var webRoot = _env.WebRootPath;
            var pathToFile = webRoot
                             + Path.DirectorySeparatorChar
                             + "EmailTemplates"
                             + Path.DirectorySeparatorChar
                             + "Account"
                             + Path.DirectorySeparatorChar
                             + "RegistrationConfirmation.html";

            var subject = "Регистрация";

            var builder = new BodyBuilder();
            using (StreamReader SourceReader = System.IO.File.OpenText(pathToFile))
            {
                builder.HtmlBody = SourceReader.ReadToEnd();
            }
            string messageBody = ReplaceTokens(builder.HtmlBody, user, url);
            await _emailService.SendEmailAsync(user.Email, subject, messageBody);
        }

        private string ReplaceTokens(string messageBody, IApplicationUser user, string url)
        {
            messageBody = messageBody.Replace(firstNameToken, user.FirstName);
            messageBody = messageBody.Replace(lastNameToken, user.LastName);
            messageBody = messageBody.Replace(urlToken, url);

            return messageBody;
        }
    }
}
