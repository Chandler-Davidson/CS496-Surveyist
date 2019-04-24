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
            Options["/{catchAll*}"] = parameters => new Response { StatusCode = HttpStatusCode.Accepted };

            After.AddItemToEndOfPipeline(context =>
            {
                context.Response.WithHeader("Access-Control-Allow-Origin", "*")
                    .WithHeader("Access-Control-Allow-Methods", "POST, GET")
                    .WithHeader("Access-Control-Allow-Headers", "Accept, Origin, Content-type");
            });

            Post[nameof(Login)] = _ => Login();
        }

        private Response Login()
        {
            var user = this.Bind<User>();

            return this.LoginAndRedirect(user.Guid);
        }
    }
}
