using Microsoft.AspNetCore.Mvc;
using Dapper;
using Models;

namespace Psaltos.Controllers;

[ApiController]
[Route("asset")]
public class AssetController : ControllerBase
{
    private readonly ILogger<AssetController> _logger;
    private readonly DapperContext _dapperContext;

    public AssetController(ILogger<AssetController> logger, DapperContext dapperContext)
    {
        _logger = logger;
        _dapperContext = dapperContext;
    }

    [HttpGet(Name = "GetAssets")]
    public IEnumerable<Asset> Get()
    {
        using (var connection = _dapperContext.GetConnection())
        {
            var assets = connection.Query<Asset>("SELECT * FROM Assets");
            return assets;
        }
    }
}

