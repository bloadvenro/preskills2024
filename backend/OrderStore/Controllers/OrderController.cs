using Microsoft.AspNetCore.Mvc;
using OrderStore.Core.Abstractions;
using OrderStore.Core.Models;

namespace OrderStore.Controllers;

[ApiController]
[Route("[controller]")]
public class OrderController : ControllerBase
{
    private readonly IOrdersService _ordersService;

    public OrderController(IOrdersService ordersService)
    {
        _ordersService = ordersService;
    }

    [HttpPost("Test")]
    public async Task<ActionResult<string>> Test()
    {
        return Ok("test");
    }

    [HttpGet]
    public async Task<ActionResult<List<Order>>> Get()
    {
        return await _ordersService.GetAllOrders();
    }
}