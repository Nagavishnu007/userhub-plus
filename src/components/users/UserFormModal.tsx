 import { useEffect } from 'react';
 import { useForm } from 'react-hook-form';
 import { zodResolver } from '@hookform/resolvers/zod';
 import { User, UserFormData } from '@/types/user';
 import { userFieldsConfig, userFormSchema } from '@/config/userFields';
 import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
 } from '@/components/ui/dialog';
 import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
 } from '@/components/ui/form';
 import { Input } from '@/components/ui/input';
 import { Button } from '@/components/ui/button';
 import { Loader2 } from 'lucide-react';
 
 interface UserFormModalProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
   user?: User | null;
   onSubmit: (data: UserFormData) => void;
   isLoading?: boolean;
 }
 
 export const UserFormModal = ({
   open,
   onOpenChange,
   user,
   onSubmit,
   isLoading = false,
 }: UserFormModalProps) => {
   const isEditing = !!user;
   
   const form = useForm<UserFormData>({
     resolver: zodResolver(userFormSchema),
     defaultValues: {
       firstName: '',
       lastName: '',
       email: '',
       phone: '',
     },
   });
 
   // Reset form when modal opens/closes or user changes
   useEffect(() => {
     if (open) {
       if (user) {
         form.reset({
           firstName: user.firstName,
           lastName: user.lastName,
           email: user.email,
           phone: user.phone,
         });
       } else {
         form.reset({
           firstName: '',
           lastName: '',
           email: '',
           phone: '',
         });
       }
     }
   }, [open, user, form]);
 
   const handleSubmit = (data: UserFormData) => {
     onSubmit(data);
   };
 
   // Sort fields by order
   const sortedFields = [...userFieldsConfig].sort((a, b) => a.order - b.order);
 
   return (
     <Dialog open={open} onOpenChange={onOpenChange}>
       <DialogContent className="sm:max-w-[425px]">
         <DialogHeader>
           <DialogTitle>
             {isEditing ? 'Edit User' : 'Add New User'}
           </DialogTitle>
           <DialogDescription>
             {isEditing
               ? 'Update the user information below.'
               : 'Fill in the details to create a new user.'}
           </DialogDescription>
         </DialogHeader>
 
         <Form {...form}>
           <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
             {sortedFields.map((fieldConfig) => (
               <FormField
                 key={fieldConfig.name}
                 control={form.control}
                 name={fieldConfig.name as keyof UserFormData}
                 render={({ field }) => (
                   <FormItem>
                     <FormLabel>{fieldConfig.label}</FormLabel>
                     <FormControl>
                       <Input
                         type={fieldConfig.type}
                         placeholder={fieldConfig.placeholder}
                         {...field}
                       />
                     </FormControl>
                     <FormMessage />
                   </FormItem>
                 )}
               />
             ))}
 
             <DialogFooter className="gap-2 sm:gap-0">
               <Button
                 type="button"
                 variant="outline"
                 onClick={() => onOpenChange(false)}
                 disabled={isLoading}
               >
                 Cancel
               </Button>
               <Button type="submit" disabled={isLoading}>
                 {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                 {isEditing ? 'Save Changes' : 'Create User'}
               </Button>
             </DialogFooter>
           </form>
         </Form>
       </DialogContent>
     </Dialog>
   );
 };