namespace OrderStore.Users;

public class User
{
    public string Login { get; set; }
    
    public string Password { get; set; }
    
    public string Id { get; set; }
    
    public string Role { get; set; }
}

public static class Users
{
    public static List<User> SystemUsers = new List<User>()
    {
        new User()
        {
            Login = "Test",
            Password = "Test",
            Id = "id",
            Role = "role"
        },
        new User()
        {
            Login = "",
            Password = "",
            Id = "",
            Role = ""
        },
        new User()
        {
            Login = "",
            Password = "",
            Id = "",
            Role = ""
        }
    };
}