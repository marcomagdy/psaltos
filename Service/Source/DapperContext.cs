using System.Data;
using MySql.Data.MySqlClient;

public class DapperContext
{
    private readonly string? _connectionString;
    private readonly IDbConnection _connection;

    public DapperContext(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("Default");
        _connection = new MySqlConnection(_connectionString);
    }

    public IDbConnection GetConnection()
    {
        if (_connection.State == ConnectionState.Closed)
            _connection.Open();

        return _connection;
    }
}
