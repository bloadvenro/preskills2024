using OrderStore.Core.Models;

namespace OrderStore.Core.Abstractions;

public interface IOrdersRepository
{
    Task<List<Order>> Get();
    Task<Guid> Create(Order order);
    Task<Guid> Update(Guid id, string name, string userId, int status, DateTime editDate, string comment, uint fileId);
    Task<Guid> Delete(Guid id);
}