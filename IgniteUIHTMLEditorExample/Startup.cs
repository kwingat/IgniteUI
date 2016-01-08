using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(IgniteUIHTMLEditorExample.Startup))]
namespace IgniteUIHTMLEditorExample
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
