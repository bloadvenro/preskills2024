using System.Text.Json;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using OrderStore.Core.Abstractions;
using OrderStore.Core.Models;

namespace OrderStore.Application.Services;

public class BackgroundApprovalService : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;
    private readonly FileConfigOptions _fileConfigOptions;
    private readonly List<Interval> _intervals;
    private DateTime? _lastSendTime;

    public BackgroundApprovalService(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
        _fileConfigOptions = new FileConfigOptions();
        _intervals = LoadJson(_fileConfigOptions.FilePath);
    } 

    private List<Interval> LoadJson(string filePath)
    {
        using StreamReader r = new StreamReader(filePath);
        string json = r.ReadToEnd();
        return JsonSerializer.Deserialize<List<Interval>>(json)!;
    }

    protected override async Task ExecuteAsync(CancellationToken cancellationToken) 
    { 
        while (!cancellationToken.IsCancellationRequested) 
        { 
            await SendAsync(cancellationToken);
            await Task.Delay(TimeSpan.FromSeconds(2), cancellationToken).ConfigureAwait(false);
        } 
    } 
 
    private async Task SendAsync(CancellationToken cancellationToken)
    {
        var time = DateTime.Now;

        if (_lastSendTime.HasValue && _lastSendTime.Value.AddMinutes(1) > time)
        {
            return;
        }

        if (_intervals.Any(interval => interval.From <= time && time <= interval.To))
        {
            using var scope = _serviceProvider.CreateScope();
            var approvalService = scope.ServiceProvider.GetService<IApprovalService>()!;
            _lastSendTime = await approvalService.SendToApproval();
        }
    } 
}