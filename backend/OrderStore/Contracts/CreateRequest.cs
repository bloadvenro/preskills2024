namespace OrderStore.Contracts;

public record CreateRequest(string UserId, string Name, uint FileId);