using Nancy;
using Nancy.Authentication.Forms;
using Nancy.ModelBinding;

namespace SurveyistServer
{
    public class SecurityModule : NancyModule
    {
        private readonly UserRepository UserRepository = new UserRepository("Users");

        public SecurityModule()
        {
            Post[nameof(Login)] = _ => Login();
        }

        private Response Login()
        {
            var user = this.Bind<User>();
            var isValidUser = UserRepository.ValidateUser(user);

            return isValidUser ? HttpStatusCode.OK : HttpStatusCode.Unauthorized;
        }
    }
}
