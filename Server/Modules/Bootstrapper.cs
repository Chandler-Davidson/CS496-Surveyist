using Nancy;
using Nancy.Authentication.Forms;
using Nancy.Bootstrapper;
using Nancy.TinyIoc;

namespace SurveyistServer.Modules
{
    public class Bootstrapper : DefaultNancyBootstrapper
    {
        protected override void ConfigureRequestContainer(TinyIoCContainer container, NancyContext context)
        {
            base.ConfigureRequestContainer(container, context);
            container.Register<IUserMapper, UserMapper>();
        }

        protected override void RequestStartup(TinyIoCContainer container, IPipelines pipelines, NancyContext context)
        {
            base.RequestStartup(container, pipelines, context);
            FormsAuthentication.Enable(new SecurityModule(), new FormsAuthenticationConfiguration
            {
                RedirectUrl = "~/",
                UserMapper = new UserMapper()
            });
        }
    }
}
