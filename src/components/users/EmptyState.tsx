 import { Users, UserPlus } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 
 interface EmptyStateProps {
   onAddUser: () => void;
 }
 
 export const EmptyState = ({ onAddUser }: EmptyStateProps) => {
   return (
     <div className="flex flex-col items-center justify-center py-16 px-4">
       <div className="rounded-full bg-muted p-6 mb-6">
         <Users className="h-12 w-12 text-muted-foreground" />
       </div>
       
       <h3 className="text-xl font-semibold text-foreground mb-2">
         No users yet
       </h3>
       
       <p className="text-muted-foreground text-center max-w-sm mb-6">
         Get started by adding your first user. Click the button below to create a new user.
       </p>
       
       <Button onClick={onAddUser} className="gap-2">
         <UserPlus className="h-4 w-4" />
         Add Your First User
       </Button>
     </div>
   );
 };