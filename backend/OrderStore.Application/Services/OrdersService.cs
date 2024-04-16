

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

    public async Task<List<Order>> GetAllOrders(string userId, string role)
    {
        var orders = await _repository.Get();

        if (role == "inspector")
            return orders;
        
        var filterOrders = orders
            .Where(x => x.UserId == userId)
            .ToList();
        return filterOrders;
    }
    
    public async Task<Order?> Get(Guid id)
    {
        var orders = await _repository.Get();
        return orders.FirstOrDefault(x => x.Id == id);
    }

    public async Task<Guid> CreateOrder(Order order)
    {
        return await _repository.Create(order);
    }

    public async Task<Guid> UpdateOrder(Order order)
    {
        return await _repository.Update(order);
    }

    public async Task<Guid> DeleteOrder(Guid id)
    {
        return await _repository.Delete(id);
    }
}