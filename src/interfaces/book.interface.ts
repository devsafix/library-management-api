export interface IBook {
  title: string;
  author: string;
  cover?: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

export interface IBookMethods extends IBook {
  decreaseCopies(quantity: number): Promise<void>;
  updateAvailable(copies: number): Promise<void>;
}
