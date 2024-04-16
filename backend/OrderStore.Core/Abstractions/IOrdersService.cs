using OrderStore.Core.Models;

namespace OrderStore.Core.Abstractions;

public interface IOrdersService
{
    Task<List<Order>> GetAllOrders();
    Task<Order> Get(Guid id);
    Task<Guid> CreateOrder(Order order);
    Task<Guid> UpdateOrder(Guid id, string name, string userId, int status, DateTime editDate, string comment, uint fileId);
    Task<Guid> DeleteOrder(Guid id);
}