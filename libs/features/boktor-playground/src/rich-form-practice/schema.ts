import { z } from 'zod';

export const FormSchema = z.object({
  name: z
    .string({
      required_error: 'Please enter a name',
    })
    .min(2, "Name isn't long enough"),
  phoneNumber: z
    .string({ required_error: 'Phone Number is required.' })
    .refine((arg) => arg.match('[0-9]'), 'Number is invalid!'),
  email: z
    .string({
      required_error: 'Email is Required',
    })
    .refine((arg) => arg.includes('@'), 'Please make sure format is correct'),
});
