using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmailService.Interfaces
{
    public interface IMailHelper
    {
        string Sender { get; set; }
        string Recipient { get; set; }
        string RecipientCC { get; set; }
        string Subject { get; set; }
        string Body { get; set; }
        string AttachmentFile { get; set; }

        void Send();

    }
}
