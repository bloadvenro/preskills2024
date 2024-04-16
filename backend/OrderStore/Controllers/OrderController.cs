using Microsoft.AspNetCore.Mvc;
using OrderStore.Contracts;
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

    [HttpGet("GetAll")]
    public async Task<ActionResult<List<Order>>> GetAll()
    {
        return await _ordersService.GetAllOrders();
    }
    
    [HttpGet("Get/{id:guid}")]
    public async Task<ActionResult<Order>> Get(Guid id)
    {
        var result = await _ordersService.Get(id);
        
        if (result == null) 
            return BadRequest();

        return result;
    }

    [HttpPut("Update/{id:guid}")]
    public async Task<ActionResult<Guid>> Update(Guid id, [FromBody] OrderRequest request)
    {
        var result = await _ordersService.UpdateOrder(id, request.Name, request.UserId, request.Status, request.EditDate,
            request.Comment, request.FileId);

        return Ok(result);
    }

    [HttpPost("Create")]
    public async Task<ActionResult<Guid>> Create([FromBody] OrderRequest request)
    {
        var order = Order.Create(
            Guid.NewGuid(),
            request.Name,
            request.UserId,
            request.Status,
            request.EditDate,
            request.Comment,
            request.FileId
            );

        var result = await _ordersService.CreateOrder(order.Order!);
        return Ok(result);
    }
}