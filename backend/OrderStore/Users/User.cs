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
            Login = "Inspector",
            Password = "Inspector00",
            Id = "1000",
            Role = "inspector"
        },
        new User()
        {
            Login = "Scientist 1",
            Password = "Scientist01",
            Id = "1001",
            Role = "scientist"
        },
        new User()
        {
            Login = "Scientist 2",
            Password = "Scientist02",
            Id = "1002",
            Role = "scientist"
        }
    };
}