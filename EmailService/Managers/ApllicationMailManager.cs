using System.Net.Mail;

namespace EmailService
{
    public class ApllicationMailManager : MailManager
    {
        public override MailMessage CreateMailMessage()
        {
            MailAddress From = new MailAddress(GetCustomerEmail());
            MailAddress To = new MailAddress(GetAdminEmail());
            ApplicationMailMessage applicationMailMessage = new ApplicationMailMessage (From,To);
            applicationMailMessage.Smtp = Smtp;

            return applicationMailMessage;
        }
    }
}
