using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using IgniteUI.Models;
using Infragistics.Web.Mvc;

namespace IgniteUI.Controllers
{
    public class ServiceHistoryController : Controller
    {
        // GET: ServiceHistory
        public ActionResult Index()
        {
            GridModel grid = GridLoadOnDemandModel();
            grid.ID = "Services";
            grid.LoadOnDemand = true;
            grid.DataSourceUrl = this.Url.Action("BindParent");
            grid.ColumnLayouts[0].DataSourceUrl = this.Url.Action("BindChild");
            return View(grid);
        }

        private GridModel GridLoadOnDemandModel()
        {
            GridModel grid = new GridModel();
            grid.AutoGenerateLayouts = false;
            grid.AutoGenerateColumns = true;
            grid.PrimaryKey = "ID";
            grid.Width = "100%";
            grid.Columns.Add(new GridColumn() { HeaderText = "Service ID", Key = "ID", DataType = "number" });
            grid.Columns.Add(new GridColumn() { HeaderText = "Client ID", Key = "ClientID", DataType = "number" });
            grid.Columns.Add(new GridColumn() { HeaderText = "Package ID", Key = "PackageID", DataType = "number" });

            GridColumnLayoutModel layout = new GridColumnLayoutModel();
            layout.Key = "ServiceHistory";
            layout.ForeignKey = "ID";
            layout.PrimaryKey = "ID";
            layout.AutoGenerateColumns = false;
            layout.Columns.Add(new GridColumn() { HeaderText = "Log ID", Key = "LogID", DataType = "number", Hidden = true });
            layout.Columns.Add(new GridColumn() { HeaderText = "Service ID", Key = "ID", DataType = "number", Hidden = true});
            layout.Columns.Add(new GridColumn() { HeaderText = "Client ID", Key = "ClientID", DataType = "number" });
            layout.Columns.Add(new GridColumn() { HeaderText = "Package ID", Key = "PackageID", DataType = "number" });

            layout.Width = "100%";
            grid.ColumnLayouts.Add(layout);

            return grid;
        }

        public JsonResult BindParent()
        {
            GridModel model = GridLoadOnDemandModel();
            model.DataSource = GetService().AsQueryable();
            return model.GetData();
        }

        public JsonResult BindChild(string path, string layout)
        {
            GridModel model = GridLoadOnDemandModel();
            model.DataSource = GetServiceLogs().AsQueryable();
            return model.GetData(path, layout);
        }

        private IEnumerable<Service> GetService()
        {
            var services = new List<Service>();

            for (int i = 0; i < 10; i++)
            {
                var service = new Service
                {
                    ID = i,
                    ClientID = 1,
                    PackageID = 1
                };

                services.Add(service);
            }

            return services;
        }

        private IEnumerable<ServiceLog> GetServiceLogs()
        {
            var serviceLogs = new List<ServiceLog>();

            for (int i = 0; i < 10; i++)
            {
                var serviceLog = new ServiceLog
                {
                    LogID = i,
                    ID = 1,
                    ClientID = i,
                    PackageID = i
                };

                serviceLogs.Add(serviceLog);
            }

            return serviceLogs;
        } 
    }
}