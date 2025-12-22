export interface Transaction {
  _id: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  date: string;      // ISO format
  description?: string;
  userId?: string;
  createdAt?: string;
}
