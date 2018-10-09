namespace EmailService.Interfaces
{
    public interface IMailHelper
    {
        string Sender { get; set; }
        string Recipient { get; set; }
        string Subject { get; set; }
        string Body { get; set; }

        void Send();

    }
}
