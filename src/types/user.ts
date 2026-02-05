 // User type definition - extend this interface when adding new fields
 export interface User {
   id: string;
   firstName: string;
   lastName: string;
   email: string;
   phone: string;
   createdAt: string;
 }
 
 export type UserFormData = Omit<User, 'id' | 'createdAt'>;