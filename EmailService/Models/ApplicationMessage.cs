using System;
using System.Net.Mail;
using EmailService.Interfaces;

namespace EmailService
{
    public class ApplicationMailMessage : MailMessage, IMailMessage
    {
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Message { get; set; }
        public SmtpClient Smtp { get; set; }

        public ApplicationMailMessage() : base() { }

        public ApplicationMailMessage(MailAddress from, MailAddress to) : base(from, to) { }

        public string Send()
        {

            string feedback = "";

            try
            {
                Smtp.Send(this);
                feedback = "Message sent to insurance";
            }
            catch (Exception e)
            {
                feedback = "Message not sent retry" + e.Message;
            }
            return feedback;
        }

        public void Initialize()
        {
            Subject = "New customer application";
            Body = String.Format(
                "There is new customer application: \n"
                + "Customer name:{0} \n"
                + "Customer phone: {1}\n"
                + "Customer message:{2}",
                Name,
                Phone,
                Message
                );

        }
    }
}
