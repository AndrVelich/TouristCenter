namespace EmailService.Interfaces
{
    public interface IMailMessage
    {
        string Send();
        void Initialize();
    }

}
