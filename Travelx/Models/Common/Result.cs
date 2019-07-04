
namespace Travelx.Models.Common
{
    public class Result
    {
        public bool IsSuccess { get; set; }
        public string ErrorMessage { get; set; }

        public static Result SuccessResult()
        {
            var result = new Result {IsSuccess = true};
            return result;
        }

        public static Result FailResult(string errorMessage)
        {
            var result = new Result { ErrorMessage = errorMessage };
            return result;
        }
    }
}
