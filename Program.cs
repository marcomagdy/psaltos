var builder = WebApplication.CreateBuilder(args);
var _policyName = "CorsPolicy";
// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddSingleton<DapperContext>();
builder.Services.AddCors(opt =>
    {
        opt.AddPolicy(name: _policyName, builder =>
        {
            builder.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
    });
var app = builder.Build();

// app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors(_policyName);

app.MapControllers();

app.MapFallbackToFile("index.html");

app.Run();
