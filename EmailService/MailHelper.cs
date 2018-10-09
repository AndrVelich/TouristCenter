using System.Net.Mail;
using System;
using System.IO;
using EmailService.Interfaces;

namespace EmailService
{
    public class MailHelper : IMailHelper
    {
        public string Sender { get; set; }
        public string Recipient { get; set; }
        public string RecipientCC { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }

        public void Send()
        {
            try
            {
                var message = new MailMessage(Sender, Recipient, Subject, Body) { IsBodyHtml = true };

                var smtp = new SmtpClient();
                smtp.Send(message);

                message.Dispose();
                smtp.Dispose();
            }

            catch (Exception ex)
            {

            }
        }
    }
}