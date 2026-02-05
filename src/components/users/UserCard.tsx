 import { User } from '@/types/user';
 import { Card, CardContent } from '@/components/ui/card';
 import { Button } from '@/components/ui/button';
 import { Avatar, AvatarFallback } from '@/components/ui/avatar';
 import { Pencil, Trash2, Mail, Phone } from 'lucide-react';
 
 interface UserCardProps {
   user: User;
   onEdit: (user: User) => void;
   onDelete: (user: User) => void;
 }
 
 export const UserCard = ({ user, onEdit, onDelete }: UserCardProps) => {
   const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
   const fullName = `${user.firstName} ${user.lastName}`;
 
   return (
     <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
       <CardContent className="p-6">
         <div className="flex items-start gap-4">
           <Avatar className="h-14 w-14 bg-primary/10">
             <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
               {initials}
             </AvatarFallback>
           </Avatar>
           
           <div className="flex-1 min-w-0">
            <div className='flex justify-between'>
             <h3 className="font-semibold text-lg text-foreground truncate">
               {fullName}
             </h3>
             <div>
             <Button
             variant="ghost"
             size="icon"
             onClick={() => onEdit(user)}
             className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
           >
             <Pencil className="h-4 w-4" />
             <span className="sr-only">Edit user</span>
           </Button>
           
           <Button
             variant="ghost"
             size="icon"
             onClick={() => onDelete(user)}
             className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
           >
             <Trash2 className="h-4 w-4" />
             <span className="sr-only">Delete user</span>
           </Button>
           </div>
            </div>
             
             <div className="mt-2 space-y-1.5">
               <div className="flex items-center gap-2 text-sm text-muted-foreground">
                 <Mail className="h-4 w-4 shrink-0" />
                 <span className="truncate">{user.email}</span>
               </div>
               
               <div className="flex items-center gap-2 text-sm text-muted-foreground">
                 <Phone className="h-4 w-4 shrink-0" />
                 <span className="truncate">{user.phone}</span>
               </div>
             </div>
           </div>
         </div>
         
         {/* <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"> */}
           
         {/* </div> */}
       </CardContent>
     </Card>
   );
 };