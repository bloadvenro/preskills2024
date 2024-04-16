using Microsoft.EntityFrameworkCore;
using OrderStore.Core.Abstractions;
using OrderStore.DataAccess;
using OrderStore.DataAccess.Entities;


namespace OrderStore.Application.Services;

public class ApprovalService // : IApprovalService
{
    private readonly IOrdersRepository _repository;

    public ApprovalService(IOrdersRepository repository)
    {
        _repository = repository;
    }
    
    public async Task<string> SendToApproval()
    {
        var orders = await _repository.Get();
        var order = orders.OrderBy(x => x.EditDate).FirstOrDefault(x => x.Status == 1);

        if (order == null)
        {
            return string.Empty;
        }

        var result = await _repository.Update(order.Id, order.Name, order.UserId, 3, DateTime.Now, order.Comment,
            order.FileId);
        
        return result.ToString();
    }
}