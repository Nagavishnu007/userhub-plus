 import { z } from 'zod';
 
 // Field configuration type
 export interface FieldConfig {
   name: string;
   label: string;
   type: 'text' | 'email' | 'tel' | 'date';
   placeholder: string;
   validation: z.ZodString;
   displayInCard: boolean;
   order: number;
 }
 
 // Schema-driven field configuration - ADD NEW FIELDS HERE
 export const userFieldsConfig: FieldConfig[] = [
   {
     name: 'firstName',
     label: 'First Name',
     type: 'text',
     placeholder: 'Enter first name',
     validation: z.string().min(2, 'First name must be at least 2 characters').max(50, 'First name must be less than 50 characters'),
     displayInCard: true,
     order: 1,
   },
   {
     name: 'lastName',
     label: 'Last Name',
     type: 'text',
     placeholder: 'Enter last name',
     validation: z.string().min(2, 'Last name must be at least 2 characters').max(50, 'Last name must be less than 50 characters'),
     displayInCard: true,
     order: 2,
   },
   {
     name: 'email',
     label: 'Email Address',
     type: 'email',
     placeholder: 'Enter email address',
     validation: z.string().email('Please enter a valid email address').max(100, 'Email must be less than 100 characters'),
     displayInCard: true,
     order: 3,
   },
   {
     name: 'phone',
     label: 'Phone Number',
     type: 'tel',
     placeholder: 'Enter phone number',
     validation: z.string().min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number must be less than 15 digits').regex(/^[+]?[\d\s-()]+$/, 'Please enter a valid phone number'),
     displayInCard: true,
     order: 4,
   },
 ];
 
 // Generate Zod schema dynamically from field config
 export const generateUserSchema = () => {
   const schemaShape: Record<string, z.ZodString> = {};
   userFieldsConfig.forEach((field) => {
     schemaShape[field.name] = field.validation;
   });
   return z.object(schemaShape);
 };
 
 export const userFormSchema = generateUserSchema();