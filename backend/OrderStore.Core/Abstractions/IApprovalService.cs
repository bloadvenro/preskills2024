namespace OrderStore.Core.Abstractions;

public interface IApprovalService
{
    Task<string> SendToApproval();
}