 import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
 import { userApi } from '@/services/userApi';
 import { User, UserFormData } from '@/types/user';
 import { toast } from '@/hooks/use-toast';
 
 export const useUsers = () => {
   const queryClient = useQueryClient();
 
   // Fetch all users
   const {
     data: users = [],
     isLoading,
     error,
     refetch,
   } = useQuery({
     queryKey: ['users'],
     queryFn: userApi.getUsers,
   });
 
   // Create user mutation
   const createMutation = useMutation({
     mutationFn: (data: UserFormData) => userApi.createUser(data),
     onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ['users'] });
       toast({
         title: 'Success!',
         description: 'User created successfully.',
       });
     },
     onError: (error: Error) => {
       toast({
         title: 'Error',
         description: error.message || 'Failed to create user.',
         variant: 'destructive',
       });
     },
   });
 
   // Update user mutation
   const updateMutation = useMutation({
     mutationFn: ({ id, data }: { id: string; data: UserFormData }) =>
       userApi.updateUser(id, data),
     onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ['users'] });
       toast({
         title: 'Success!',
         description: 'User updated successfully.',
       });
     },
     onError: (error: Error) => {
       toast({
         title: 'Error',
         description: error.message || 'Failed to update user.',
         variant: 'destructive',
       });
     },
   });
 
   // Delete user mutation
   const deleteMutation = useMutation({
     mutationFn: (id: string) => userApi.deleteUser(id),
     onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ['users'] });
       toast({
         title: 'Success!',
         description: 'User deleted successfully.',
       });
     },
     onError: (error: Error) => {
       toast({
         title: 'Error',
         description: error.message || 'Failed to delete user.',
         variant: 'destructive',
       });
     },
   });
 
   return {
     users,
     isLoading,
     error,
     refetch,
     createUser: createMutation.mutate,
     updateUser: updateMutation.mutate,
     deleteUser: deleteMutation.mutate,
     isCreating: createMutation.isPending,
     isUpdating: updateMutation.isPending,
     isDeleting: deleteMutation.isPending,
   };
 };