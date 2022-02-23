namespace DataLyzer.JwtToken.Provider
{
    public interface IJwtTokenHandler
    {
        string GetToken(string email, string username);
    }
}
