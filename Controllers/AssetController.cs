using Microsoft.AspNetCore.Mvc;
using Dapper;
using Models;

namespace Psaltos.Controllers;

[ApiController]
[Route("asset")]
public class AssetController : ControllerBase
{
    private readonly ILogger<AssetController> _logger;
    private readonly IDapperContext _dapperContext;

    public AssetController(ILogger<AssetController> logger, IDapperContext dapperContext)
    {
        _logger = logger;
        _dapperContext = dapperContext;
    }

    [HttpGet(Name = "GetAssets")]
    public IEnumerable<Asset> Get([FromQuery(Name = "tagId")] int[] tags)
    {
        using (var connection = _dapperContext.GetConnection())
        {
            var assets = connection.Query<Asset>(@"SELECT * FROM Assets
                    JOIN AssetTags on Assets.Id = AssetTags.AssetId
                    AND AssetTags.TagId IN @tags", new { tags });
            return assets;
        }
    }
}

