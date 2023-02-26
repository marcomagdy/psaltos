using System.Data;
using Microsoft.Data.Sqlite;
using MySql.Data.MySqlClient;

public interface IDapperContext
{
    IDbConnection GetConnection();
}

public class MySqlDapperContext : IDapperContext
{
    private readonly string? _connectionString;
    private readonly IDbConnection _connection;

    public MySqlDapperContext(IConfiguration configuration)
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
// DapperContext for Sqlite3
public class SqliteDapperContext : IDapperContext
{
    private readonly string? _connectionString;
    private readonly IDbConnection _connection;

    public SqliteDapperContext(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("Sqlite");
        _connection = new SqliteConnection(_connectionString);
        CreateIfNotExists();
    }

    private void CreateIfNotExists()
    {
        using (var connection = _connection)
        {
            connection.Open();
            var command = connection.CreateCommand();
            command.CommandText = @"CREATE TABLE IF NOT EXISTS Assets (
                Id INTEGER PRIMARY KEY AUTOINCREMENT,
                Name TEXT NOT NULL,
                Description TEXT,
                CreatedAt TEXT NOT NULL,
                UpdatedAt TEXT NOT NULL
            );";
            command.ExecuteNonQuery();
            command.CommandText = @"CREATE TABLE IF NOT EXISTS Tags (
                Id INTEGER PRIMARY KEY AUTOINCREMENT,
                Name TEXT NOT NULL,
                Description TEXT,
                CreatedAt TEXT NOT NULL,
                UpdatedAt TEXT NOT NULL
            );";
            command.ExecuteNonQuery();
            command.CommandText = @"CREATE TABLE IF NOT EXISTS AssetTags (
                Id INTEGER PRIMARY KEY AUTOINCREMENT,
                AssetId INTEGER NOT NULL,
                TagId INTEGER NOT NULL,
                CreatedAt TEXT NOT NULL,
                UpdatedAt TEXT NOT NULL,
                FOREIGN KEY (AssetId) REFERENCES Assets(Id),
                FOREIGN KEY (TagId) REFERENCES Tags(Id)
            );";
            command.ExecuteNonQuery();
        }
    }

    public IDbConnection GetConnection()
    {
        if (_connection.State == ConnectionState.Closed)
            _connection.Open();

        return _connection;
    }
}