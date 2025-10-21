import { Database } from "database.types";

// Databaseの型を直接使うと、取り回ししにくいので、エンティティを定義する
export type Note = Database["public"]["Tables"]["notes"]["Row"];