namespace IgniteUIHTMLEditorExample.Models
{
    public class Service
    {
        public int ID { get; set; }
        public int ClientID { get; set; }
        public int PackageID { get; set; }
    }

    public class ServiceLog
    {
        public int LogID { get; set; }
        public int ID { get; set; }
        public int ClientID { get; set; }
        public int PackageID { get; set; }
    }
}