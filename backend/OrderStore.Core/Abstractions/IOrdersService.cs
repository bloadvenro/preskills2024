using OrderStore.Core.Models;

namespace OrderStore.Core.Abstractions;

public interface IOrdersService
{
    Task<List<Order>> GetAllBooks();
    Task<Guid> CreateBook(Order order);
    Task<Guid> UpdateBook(Guid id, string name, string userId, int status, DateTime editDate, string comment, uint fileId);
    Task<Guid> DeleteBook(Guid id);
}