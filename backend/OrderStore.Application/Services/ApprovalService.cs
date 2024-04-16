using OrderStore.Core.Abstractions;
using OrderStore.Core.Models;

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

        var result = await _repository.Update(order with 
        {
            Status = (int)Status.Sent,
            EditDate = DateTime.UtcNow,
        });

        return result.ToString();
    }
}