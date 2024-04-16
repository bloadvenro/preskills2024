using Microsoft.EntityFrameworkCore;
using OrderStore.Core.Abstractions;
using OrderStore.Core.Models;
using OrderStore.DataAccess.Entities;

namespace OrderStore.DataAccess.Repositories;

public class OrdersRepository : IOrdersRepository
{
    private readonly OrderStoreDbContext _dbContext;
    
    public OrdersRepository(OrderStoreDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<Order>> Get()
    {
        var bookEntities = await _dbContext.Orders
            .AsNoTracking()
            .ToListAsync();

        var books = bookEntities
            .Select(x => Order.Create(x.Id, x.Name, x.UserId, x.Status, x.EditDate, x.Comment, x.FileId).Order)
            .ToList();
        
        return books!;
    }

    public async Task<Guid> Create(Order order)
    {
        var orderEntity = new OrderEntity()
        {
            Id = order.Id,
            Name = order.Name,
            UserId = order.UserId,
            FileId = order.FileId,
            Comment = order.Comment,
            EditDate = order.EditDate,
            Status = order.Status,
        };

        await _dbContext.Orders.AddAsync(orderEntity);
        await _dbContext.SaveChangesAsync();

        return orderEntity.Id;
    }

    public async Task<Guid> Update(Guid id, string name, string userId, int status, DateTime editDate, string comment, uint fileId)
    {
        await _dbContext.Orders
            .Where(x => x.Id == id)
            .ExecuteUpdateAsync(x => x
                .SetProperty(b => b.Name, b => name)
                .SetProperty(b => b.UserId, b => userId)
                .SetProperty(b => b.Status, b => status)
                .SetProperty(b => b.EditDate, b => editDate)
                .SetProperty(b => b.Comment, b => comment)
                .SetProperty(b => b.FileId, b => fileId));

        return id;
    }

    public async Task<Guid> Delete(Guid id)
    {
        await _dbContext.Orders
            .Where(x => x.Id == id)
            .ExecuteDeleteAsync();

        return id;
    }
}