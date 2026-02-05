 import { Card, CardContent } from '@/components/ui/card';
 import { Skeleton } from '@/components/ui/skeleton';
 
 export const UserCardSkeleton = () => {
   return (
     <Card className="overflow-hidden">
       <CardContent className="p-6">
         <div className="flex items-start gap-4">
           <Skeleton className="h-14 w-14 rounded-full" />
           
           <div className="flex-1 space-y-3">
             <Skeleton className="h-5 w-32" />
             <div className="space-y-2">
               <Skeleton className="h-4 w-48" />
               <Skeleton className="h-4 w-36" />
             </div>
           </div>
         </div>
       </CardContent>
     </Card>
   );
 };