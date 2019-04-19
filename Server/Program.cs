using System;
using Nancy.Hosting.Self;

namespace SurveyistServer
{
    internal class Program
    {
        private static void Main()
        {
            var hostConfigs = new HostConfiguration
            {
                UrlReservations = new UrlReservations
                {
                    CreateAutomatically = true
                }
            };

            const string url = "http://localhost:8080";

            using (var host = new NancyHost(hostConfigs, new Uri(url)))
            {
                host.Start();
                Console.WriteLine($"Running on {url}");
                Console.ReadLine();
            }
        }
    }
}