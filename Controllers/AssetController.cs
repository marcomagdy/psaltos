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
            await connection.ExecuteAsync(sqlStatement, new {assetId = assetId});
        }
        return Ok();
    }

    [HttpPost]
    [Route("{assetId}/tag")]
    public async Task<IActionResult> TagAsset(int assetId, [FromBody] int[] tagIds)
    {
        // TODO: add protection to verify that these are valid ids
        _logger.LogInformation("TagAsset: assetId=" + assetId);
        if (tagIds == null || tagIds.Length == 0) {
            return new BadRequestResult();
        }

        using (var connection = _dapperContext.GetConnection())
        {
            var sqlStatement = @"
            INSERT INTO AssetTags 
                (AssetId,
                TagId) VALUES";
            foreach (int tag in tagIds) {
                sqlStatement += ("(" + assetId + ", " + tag + "),");
            }
            _logger.LogInformation(sqlStatement);
            await connection.ExecuteAsync(sqlStatement.Substring(0, sqlStatement.Length - 1));
        }
        return Ok();
    }
}
