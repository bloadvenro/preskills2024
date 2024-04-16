

using OrderStore.Core.Abstractions;
using OrderStore.Core.Models;

namespace OrderStore.Application.Services;

public class OrdersService : IOrdersService
{
    private readonly IOrdersRepository _repository;
    
    public OrdersService(IOrdersRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<Order>> GetAllOrders()
    {
        return await _repository.Get();
    }
    
    public async Task<Order> Get(Guid id)
    {
        var orders = await _repository.Get();
        return orders.FirstOrDefault(x => x.Id == id)!;
    }

    public async Task<Guid> CreateOrder(Order order)
    {
        return await _repository.Create(order);
    }

    public async Task<Guid> UpdateOrder(Guid id, string name, string userId, int status, DateTime editDate, string comment, uint fileId)
    {
        return await _repository.Update(id, name, userId, status, editDate, comment, fileId);
    }

    public async Task<Guid> DeleteOrder(Guid id)
    {
        return await _repository.Delete(id);
    }
}