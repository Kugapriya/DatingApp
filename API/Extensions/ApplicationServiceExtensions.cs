// using System.Text.Json;
// using System.Text.Json.Serialization;
// using API.Data;
// using API.Helpers;
// using API.Interfaces;
// using API.Services;
// using Microsoft.EntityFrameworkCore;
// using Newtonsoft.Json;

// namespace API.Extensions;
// public static class ApplicationServiceExtensions
// {
//     public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
//     {
//     //     services.AddControllers()
//     //     .AddJsonOptions(options =>
//     // {
//     //     options.JsonSerializerOptions.PropertyNamingPolicy =JsonNamingPolicy.CamelCase;
//     //     options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
//   services.AddControllers();
//   services.AddDbContext<DataContext>(opt =>
//         {
//             opt.UseSqlServer(config.GetConnectionString("DefaultConnection"));
//         });
           
//     // });
//     // services.AddControllers()
//     // .AddNewtonsoftJson(options =>
//     // {
//     //     options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
//     //     options.SerializerSettings.PreserveReferencesHandling = PreserveReferencesHandling.Objects;
//     // });

//         IServiceCollection serviceCollection = services.AddDbContext<DataContext>(opt =>
//     {
//         opt.UseSqlServer(config.GetConnectionString("DefaultConnection"));
//     });

    

  
//       services.AddCors();
//       services.AddScoped<ITokenService, TokenService>();
//       services.AddScoped<ILikesRepository,LikesRepository>();
//       services.AddScoped<IUserRepository, UserRepository>();
//       services.AddScoped<IMessageRepository,MessageRepository>();
//       services.AddScoped<IPhotoService,PhotoService>();
//       services.AddScoped<LogUserActivity>();
//       services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
//       services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));
      
//        return services;
//     }
// }
﻿using API.Data;
using API.Helpers;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services,
        IConfiguration config)
    {
        services.AddControllers();
        services.AddDbContext<DataContext>(opt =>
        {
            opt.UseSqlServer(config.GetConnectionString("DefaultConnection"));
        });
        services.AddCors();
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<ILikesRepository, LikesRepository>();
        services.AddScoped<IMessageRepository, MessageRepository>();
        services.AddScoped<IPhotoService, PhotoService>();
         services.AddScoped<LogUserActivity>();
        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));
        


        return services;
    }
}