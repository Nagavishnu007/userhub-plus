 import { Button } from '@/components/ui/button';
 import { UserPlus, Users } from 'lucide-react';
 
 interface HeaderProps {
   onAddUser: () => void;
   userCount: number;
 }
 
 export const Header = ({ onAddUser, userCount }: HeaderProps) => {
   return (
     <header className="border-b bg-card">
       <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
           <div className="flex items-center gap-3">
             <div className="rounded-lg bg-primary p-2">
               <Users className="h-6 w-6 text-primary-foreground" />
             </div>
             <div>
               <h1 className="text-2xl font-bold text-foreground">User Manager</h1>
               <p className="text-sm text-muted-foreground">
                 {userCount} {userCount === 1 ? 'user' : 'users'} total
               </p>
             </div>
           </div>
           
           <Button onClick={onAddUser} className="gap-2 w-full sm:w-auto">
             <UserPlus className="h-4 w-4" />
             Add User
           </Button>
         </div>
       </div>
     </header>
   );
 };