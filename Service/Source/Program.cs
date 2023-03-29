var builder = WebApplication.CreateBuilder(args);

// Enable cors for specific origin http://beta.psaltos.com
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://beta.psaltos.com")
        .WithMethods("GET")
        .AllowAnyHeader());
});


// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddSingleton<DapperContext>();
var app = builder.Build();

app.UseRouting();

app.UseCors("AllowSpecificOrigin");

app.MapControllers();

app.Run();
