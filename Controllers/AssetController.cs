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


    [HttpPost(Name = "CreateAsset")]
    public async Task<IActionResult> Create([FromBody] Asset asset)
    {
        using (var connection = _dapperContext.GetConnection())
        {
            var sqlStatement = @"
            INSERT INTO Assets 
                (TypeId,
                Location,
                EnglishName,
                CopticName)
            VALUES (@TypeId,
                @Location,
                @EnglishName,
                @CopticName)";
            await connection.ExecuteAsync(sqlStatement, asset);
        }
        return Ok();
    }

    [HttpPut(Name = "UpdateAsset")]
    public async Task<IActionResult> Update([FromBody] Asset asset)
    {
        _logger.LogInformation("Update: asset=" + asset.AssetId);
        using (var connection = _dapperContext.GetConnection())
        {
            var sqlStatement = @"
            UPDATE Assets 
                SET TypeId = @TypeId,
                Location = @Location,
                EnglishName = @EnglishName,
                CopticName = @CopticName
            WHERE AssetId = @AssetId";
            await connection.ExecuteAsync(sqlStatement, asset);
        }
        return Ok();
    }

    [HttpDelete("{assetId:int}")]
    public async Task<IActionResult> Delete(int assetId)
    {
        _logger.LogInformation("Delete: assetId=" + assetId);
        using (var connection = _dapperContext.GetConnection())
        {
            var sqlStatement = @"
            DELETE FROM Assets
            WHERE AssetId = @assetId";
            await connection.ExecuteAsync(sqlStatement, assetId);
        }
        return Ok();
    }
}
