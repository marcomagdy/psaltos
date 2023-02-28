using Dapper;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace psaltos.Controllers;

[ApiController]
[Route("[controller]")]
public class AssetController : ControllerBase
{
    private readonly ILogger<AssetController> _logger;
    private readonly DapperContext _dapperContext;

    public AssetController(ILogger<AssetController> logger, DapperContext dapperContext)
    {
        _logger = logger;
        _dapperContext = dapperContext;
    }

    [HttpGet]
    public IEnumerable<Asset> Get()
    {
        using (var connection = _dapperContext.GetConnection())
        {
            var assets = connection.Query<Asset>("SELECT * FROM Assets");
            return assets;
        }
    }

    [HttpPost]
    public IEnumerable<Asset> Add(Asset asset)
    {
        using (var connection = _dapperContext.GetConnection())
        {
            var query = string.Format("INSERT INTO Assets VALUES ({0}, {1}, '{2}', '{3}', '{4}');", asset.AssetId, asset.TypeId, asset.Location, asset.EnglishName, asset.CopticName);

            var assets = connection.Query<Asset>(query);
            return assets;
        }
    }
}
