using AccountService.Interfaces.Models.Enums;

namespace Travelx.Models.Account
{
    public static class LoginResult
    {
        private const string Success = "success";
        private const string LockedOut = "lockedOut";
        private const string NotAllowed = "notAllowed";
        private const string Fail = "fail";

        public static string GetLoginResultMessage(LoginResultEnum loginResult)
        {
            switch (loginResult)
            {
                case LoginResultEnum.Success:
                    return Success;
                case LoginResultEnum.LockedOut:
                    return LockedOut;
                case LoginResultEnum.NotAllowed:
                    return NotAllowed;
                default:
                    return Fail;
            }
        }
    }
}
