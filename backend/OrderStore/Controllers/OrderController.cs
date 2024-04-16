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

    [HttpGet("GetAll/{userId}")]
    public async Task<ActionResult<List<Order>>> GetAll(string userId)
    {
        var user = Users.Users.SystemUsers.FirstOrDefault(x => x.Id == userId);

        if (user != null)
            return await _ordersService.GetAllOrders(user.Id, user.Role);

        return new List<Order>();
    }
    
    [HttpGet("Get/{id:guid}")]
    public async Task<ActionResult<Order>> Get(Guid id)
    {
        var result = await _ordersService.Get(id);
        
        if (result == null) 
            return BadRequest();

        return result;
    }

    // [HttpPut("Update/{id:guid}")]
    // public async Task<ActionResult<Guid>> Update(Guid id, [FromBody] OrderRequest request)
    // {
    //     var result = await _ordersService.UpdateOrder(id, request.Name, request.UserId, request.Status, request.EditDate,
    //         request.Comment, request.FileId);

    //     return Ok(result);
    // }

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

    [HttpPost("EditOrder")]
    public async Task<ActionResult<string>> EditOrder([FromBody] EditOrderRequest request)
    {
        var order = await _ordersService.Get(request.orderId);

        if (order == null)
        {
            return BadRequest("No order");
        }

        if (order.UserId != request.userId)
        {
            return BadRequest("Another user");
        }

        if (order.Status != (int)Status.Created && order.Status != (int)Status.Rejected)
        {
            return BadRequest("Bad status");
        }

        await _ordersService.UpdateOrder(order with 
        {
            Name = request.name,
            FileId = request.fileId,
            Status = (int)Status.Created,
        });

        return Ok();
    }
}