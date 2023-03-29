using Microsoft.AspNetCore.Mvc;
using Dapper;
using Models;

namespace Psaltos.Controllers;

[ApiController]
[Route("tag")]
public class TagController : ControllerBase
{
    private readonly ILogger<TagController> _logger;
    private readonly DapperContext _dapperContext;

    public TagController(ILogger<TagController> logger, DapperContext dapperContext)
    {
        _logger = logger;
        _dapperContext = dapperContext;
    }

    [HttpGet(Name = "GetTags")]
    public IEnumerable<Tag> Get()
    {
        using (var connection = _dapperContext.GetConnection())
        {
            var tags = connection.Query<Tag>("SELECT * FROM Tags");
            return tags;
        }
    }


    [HttpPost(Name = "CreateTag")]
    public async Task<IActionResult> Create([FromBody] Tag tag)
    {
        using (var connection = _dapperContext.GetConnection())
        {
            var sqlStatement = @"
            INSERT INTO Tags 
                (CategoryId,
                EnglishName)
            VALUES (@CategoryId,
                @EnglishName)";
            await connection.ExecuteAsync(sqlStatement, tag);
        }
        return Ok();
    }

    [HttpPut(Name = "UpdateTag")]
    public async Task<IActionResult> Update([FromBody] Tag tag)
    {
        using (var connection = _dapperContext.GetConnection())
        {
            var sqlStatement = @"
            UPDATE Tags 
                SET CategoryId = @CategoryId,
                EnglishName = @EnglishName
            WHERE TagId = @TagId";
            await connection.ExecuteAsync(sqlStatement, tag);
        }
        return Ok();
    }

    [HttpDelete("{tagId:int}")]
    public async Task<IActionResult> Delete(int tagId)
    {
        using (var connection = _dapperContext.GetConnection())
        {
            var sqlStatement = @"
            DELETE FROM Tags
            WHERE TagId = @tagId";
            await connection.ExecuteAsync(sqlStatement, new {tagId = tagId});
        }
        return Ok();
    }
}
