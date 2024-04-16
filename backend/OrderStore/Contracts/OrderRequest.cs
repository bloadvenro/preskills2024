namespace OrderStore.Contracts;

public record OrderRequest(string Name, string UserId, int Status, DateTime EditDate, string Comment, uint FileId);