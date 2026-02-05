 import { User, UserFormData } from '@/types/user';
 
 // Simulated delay for realistic API behavior
 const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
 
 // Mock data store
 let users: User[] = [
   {
     id: '1',
     firstName: 'Test',
     lastName: 'user1',
     email: 'test1@gmail.com',
     phone: '9989394732',
     createdAt: new Date().toISOString(),
   },
   {
     id: '2',
     firstName: 'Test',
     lastName: 'user2',
     email: 'test2@gmail.com',
     phone: '9899898324',
     createdAt: new Date().toISOString(),
   },
   {
     id: '3',
     firstName: 'Test',
     lastName: 'user3',
     email: 'test3@gmail.com',
     phone: '8787898982',
     createdAt: new Date().toISOString(),
   },
 ];
 
 // Generate unique ID
 const generateId = () => Math.random().toString(36).substring(2, 9);
 
 // Mock API Service
 export const userApi = {
   // Get all users
   async getUsers(): Promise<User[]> {
     await delay(800);
     return [...users];
   },
 
   // Get single user by ID
   async getUser(id: string): Promise<User | undefined> {
     await delay(400);
     return users.find(user => user.id === id);
   },
 
   // Create new user
   async createUser(data: UserFormData): Promise<User> {
     await delay(600);
     const newUser: User = {
       ...data,
       id: generateId(),
       createdAt: new Date().toISOString(),
     };
     users = [...users, newUser];
     return newUser;
   },
 
   // Update existing user
   async updateUser(id: string, data: UserFormData): Promise<User> {
     await delay(600);
     const index = users.findIndex(user => user.id === id);
     if (index === -1) {
       throw new Error('User not found');
     }
     const updatedUser: User = {
       ...users[index],
       ...data,
     };
     users = users.map(user => user.id === id ? updatedUser : user);
     return updatedUser;
   },
 
   // Delete user
   async deleteUser(id: string): Promise<void> {
     await delay(500);
     const index = users.findIndex(user => user.id === id);
     if (index === -1) {
       throw new Error('User not found');
     }
     users = users.filter(user => user.id !== id);
   },
 };