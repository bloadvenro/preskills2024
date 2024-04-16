namespace OrderStore.Users;

public class User
{
    public string Login { get; set; }
    
    public string Password { get; set; }
    
    public string Id { get; set; }
    
    public string Role { get; set; }
}

public class Users
{
    public List<User> SystemUsers { get; set; }
}