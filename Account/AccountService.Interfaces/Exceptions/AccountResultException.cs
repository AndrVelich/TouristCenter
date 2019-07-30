using System;

namespace AccountService.Interfaces.Exceptions
{
    public sealed class AccountResultException : Exception
    {
        public AccountResultException()
        {
        }

        public AccountResultException(string message) : base(message)
        {
        }
    }
}
