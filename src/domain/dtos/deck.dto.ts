export interface CreateDeckDTO {
    title: string;
    description: string;
  }
  
  export interface UpdateDeckDTO {
    title?: string;
    description?: string;
  }