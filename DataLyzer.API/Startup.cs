using AspNetCore.Identity.MongoDbCore.Infrastructure;
using DataLyzer.DAL;
using DataLyzer.JwtToken;
using DataLyzer.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataLyzer.API
{
    public class Startup
    {
        const string DEVELOPMENT_CORS_POLICY = "DevCorsGlobalPolicy";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "DataLyzer.API", Version = "v1" });
            });

            services.AddCors(o => o.AddPolicy(DEVELOPMENT_CORS_POLICY, builder => {
                builder.WithOrigins(new string[] { "http://localhost:4200" }).AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithExposedHeaders("Content-Disposition", "Content-Length");
            }));

            MongoDbSettings mongoDbSettings = Configuration.GetSection(nameof(MongoDbSettings)).Get<MongoDbSettings>();
            services.AddSingleton(mongoDbSettings);

            services.AddAutoMappings();

            services
                .AddIdentity<User, Role>()
                .AddMongoDbStores<User, Role, Guid>(mongoDbSettings.ConnectionString, mongoDbSettings.DatabaseName)
                .AddSignInManager();


            services.AddDataLyzerJwtTokenHandler(Configuration);
            services.AddDataAccesLayer();


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "DataLyzer.API v1"));
                app.UseCors(DEVELOPMENT_CORS_POLICY);

            }

            app.UseHttpsRedirection();
            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
