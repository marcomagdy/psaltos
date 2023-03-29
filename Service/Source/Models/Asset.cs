namespace Models
{
    public class Asset
    {
        public int AssetId { get; set; }
        public int TypeId { get; set; }
        public string? Location { get; set; }
        public string? EnglishName { get; set; }
        public string? CopticName { get; set; }
    }
}
