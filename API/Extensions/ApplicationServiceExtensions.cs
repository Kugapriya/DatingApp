using System.Text.Json;
using System.Text.Json.Serialization;
using API.Data;
using API.Helpers;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace API.Extensions;
public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {
    //     services.AddControllers()
    //     .AddJsonOptions(options =>
    // {
    //     options.JsonSerializerOptions.PropertyNamingPolicy =JsonNamingPolicy.CamelCase;
    //     options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
  services.AddControllers();
  services.AddDbContext<DataContext>(opt =>
        {
            opt.UseSqlServer(config.GetConnectionString("DefaultConnection"));
        });
           
    // });
    // services.AddControllers()
    // .AddNewtonsoftJson(options =>
    // {
    //     options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
    //     options.SerializerSettings.PreserveReferencesHandling = PreserveReferencesHandling.Objects;
    // });

  
      services.AddCors();
      services.AddScoped<ITokenService, TokenService>();
      services.AddScoped<ILikesRepository,LikesRepository>();
      services.AddScoped<IUserRepository, UserRepository>();
      services.AddScoped<IMessageRepository,MessageRepository>();
      services.AddScoped<IPhotoRepository,PhotoRepository>();
      services.AddScoped<IUnitOfWork,UnitOfWork>();
      services.AddScoped<IPhotoService,PhotoService>();
      services.AddScoped<LogUserActivity>();
      services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
      services.AddSignalR();
      services.AddSingleton<PresenceTracker>();
      services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));
      
       return services;
    }
}
