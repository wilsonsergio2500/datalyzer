using DataLyzer.JwtToken.Config;
using DataLyzer.JwtToken.Provider;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace DataLyzer.JwtToken
{
    public static class Inject
    {
        public static IServiceCollection AddDataLyzerJwtTokenHandler(this IServiceCollection services, IConfiguration Configuration) 
        {

            TokenKeyConfig TokenKeySettings = Configuration.GetSection(nameof(TokenKeyConfig)).Get<TokenKeyConfig>();
            services.AddSingleton(TokenKeySettings);

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(TokenKeySettings.TokenKey)),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            services.AddSingleton<IJwtTokenHandler, JwtTokenHandler>();

            return services;
        }
    }
}
