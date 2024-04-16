using Microsoft.AspNetCore.Mvc;

namespace OrderStore.Controllers;

[ApiController]
[Route("[controller]")]
public class OrderController : ControllerBase
{
    public OrderController()
    {}

    [HttpPost("Test")]
    public async Task<ActionResult<string>> Test()
    {
        return Ok("test");
    }
    
}