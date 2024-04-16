using Microsoft.Extensions.Hosting;
using OrderStore.Core.Abstractions;

namespace OrderStore.Application.Services;

 
public class BackgroundApprovalService : BackgroundService
{
    public BackgroundApprovalService()
    {
        
    } 
 
    protected override async Task ExecuteAsync(CancellationToken cancellationToken) 
    { 
        while (!cancellationToken.IsCancellationRequested) 
        { 
            var result = await SendAsync(cancellationToken);
            if (!string.IsNullOrEmpty(result)) await Task.Delay(TimeSpan.FromSeconds(60), cancellationToken).ConfigureAwait(false);
        } 
    } 
 
    private async Task<string> SendAsync(CancellationToken cancellationToken)
    {
        //return await _approvalService.SendToApproval();
        return string.Empty;
    } 
}