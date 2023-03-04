using Microsoft.AspNetCore.Mvc;
using Dapper;
using Models;

namespace Psaltos.Controllers;

[ApiController]
[Route("category")]
public class CategoryController : ControllerBase
{
    private readonly ILogger<CategoryController> _logger;
    private readonly DapperContext _dapperContext;

    public CategoryController(ILogger<CategoryController> logger, DapperContext dapperContext)
    {
        _logger = logger;
        _dapperContext = dapperContext;
    }

    [HttpGet(Name = "GetCategories")]
    public IEnumerable<Category> Get()
    {
        using (var connection = _dapperContext.GetConnection())
        {
            var categories = connection.Query<Category>("SELECT * FROM Categories");
            return categories;
        }
    }


    [HttpPost(Name = "CreateCategory")]
    public async Task<IActionResult> Create([FromBody] Category category)
    {
        using (var connection = _dapperContext.GetConnection())
        {
            var sqlStatement = @"
            INSERT INTO Categories 
                (EnglishName)
            VALUES (@EnglishName)";
            await connection.ExecuteAsync(sqlStatement, category);
        }
        return Ok();
    }

    [HttpPut(Name = "UpdateCategory")]
    public async Task<IActionResult> Update([FromBody] Category category)
    {
        using (var connection = _dapperContext.GetConnection())
        {
            var sqlStatement = @"
            UPDATE Categories 
                SET EnglishName = @EnglishName
            WHERE CategoryId = @CategoryId";
            await connection.ExecuteAsync(sqlStatement, category);
        }
        return Ok();
    }

    [HttpDelete("{categoryId:int}")]
    public async Task<IActionResult> Delete(int categoryId)
    {
        using (var connection = _dapperContext.GetConnection())
        {
            var sqlStatement = @"
            DELETE FROM Categories
            WHERE CategoryId = @categoryId";
            await connection.ExecuteAsync(sqlStatement, new {categoryId = categoryId});
        }
        return Ok();
    }
}
