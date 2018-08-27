using System.Net.Mail;
using System.Net;

namespace EmailService
{
    public abstract class MailManager
    {
       public string GetAdminEmail() { return "admin@touristcenter.by"; }
       public string GetCustomerEmail() { return "costomer@touristcenter.by"; }

        private SmtpClient _smtp;
        public SmtpClient Smtp
        {
            get
            {
                return _smtp ?? new SmtpClient
                {
                    Host = "pod51014.outlook.com",
                    Port = 587,
                    Credentials = new NetworkCredential("21241112@dut4life.ac.za", "Dut930611"),
                    EnableSsl = true
                };
            }

            private set
            {
                _smtp = value;
            }

        }

       public abstract MailMessage CreateMailMessage();
        
    }
}