 import { useState } from 'react';
 import { User, UserFormData } from '@/types/user';
 import { useUsers } from '@/hooks/useUsers';
 import { Header } from '@/components/users/Header';
 import { UserCard } from '@/components/users/UserCard';
 import { UserCardSkeleton } from '@/components/users/UserCardSkeleton';
 import { EmptyState } from '@/components/users/EmptyState';
 import { UserFormModal } from '@/components/users/UserFormModal';
 import { DeleteConfirmDialog } from '@/components/users/DeleteConfirmDialog';
 
 const Index = () => {
   const [isFormOpen, setIsFormOpen] = useState(false);
   const [isDeleteOpen, setIsDeleteOpen] = useState(false);
   const [selectedUser, setSelectedUser] = useState<User | null>(null);
 
   const {
     users,
     isLoading,
     createUser,
     updateUser,
     deleteUser,
     isCreating,
     isUpdating,
     isDeleting,
   } = useUsers();
 
   const handleAddClick = () => {
     setSelectedUser(null);
     setIsFormOpen(true);
   };
 
   const handleEditClick = (user: User) => {
     setSelectedUser(user);
     setIsFormOpen(true);
   };
 
   const handleDeleteClick = (user: User) => {
     setSelectedUser(user);
     setIsDeleteOpen(true);
   };
 
   const handleFormSubmit = (data: UserFormData) => {
     if (selectedUser) {
       updateUser(
         { id: selectedUser.id, data },
         {
           onSuccess: () => setIsFormOpen(false),
         }
       );
     } else {
       createUser(data, {
         onSuccess: () => setIsFormOpen(false),
       });
     }
   };
 
   const handleDeleteConfirm = () => {
     if (selectedUser) {
       deleteUser(selectedUser.id, {
         onSuccess: () => {
           setIsDeleteOpen(false);
           setSelectedUser(null);
         },
       });
     }
   };
 
   return (
     <div className="min-h-screen bg-background">
       <Header onAddUser={handleAddClick} userCount={users.length} />
 
       <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
         {isLoading ? (
           <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
             {[...Array(4)].map((_, i) => (
               <UserCardSkeleton key={i} />
             ))}
           </div>
         ) : users.length === 0 ? (
           <EmptyState onAddUser={handleAddClick} />
         ) : (
           <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
             {users.map((user) => (
               <UserCard
                 key={user.id}
                 user={user}
                 onEdit={handleEditClick}
                 onDelete={handleDeleteClick}
               />
             ))}
           </div>
         )}
       </main>
 
       <UserFormModal
         open={isFormOpen}
         onOpenChange={setIsFormOpen}
         user={selectedUser}
         onSubmit={handleFormSubmit}
         isLoading={isCreating || isUpdating}
       />
 
       <DeleteConfirmDialog
         open={isDeleteOpen}
         onOpenChange={setIsDeleteOpen}
         user={selectedUser}
         onConfirm={handleDeleteConfirm}
         isLoading={isDeleting}
       />
     </div>
   );
 };
 
 export default Index;
