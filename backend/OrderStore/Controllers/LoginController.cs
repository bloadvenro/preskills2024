using Microsoft.AspNetCore.Mvc;
using OrderStore.Contracts;

namespace OrderStore.Controllers;

[ApiController]
[Route("[controller]")]
public class LoginController : ControllerBase
{
    public LoginController()
    {
        
    }

    [HttpPost]
    public Task<ActionResult<LoginResponse>> Login(LoginRequest request)
    {
        var user = Users.Users.SystemUsers.FirstOrDefault(x => x.Login == request.login && x.Password == request.login);
        
        return Task.FromResult<ActionResult<LoginResponse>>(Ok(new LoginResponse(user.Id, user.Role)));
    }
}