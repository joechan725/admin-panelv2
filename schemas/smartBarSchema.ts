import { z } from 'zod';

export const smartBarSchema = z
  .object({
    titleZH: z.string().optional(),
    titleEN: z.string().optional(),
    messageZH: z.string().min(1, 'required'),
    messageEN: z.string().min(1, 'required'),
    link: z.string().url('invalidUrl').or(z.literal('')),
    linkDescriptionZH: z.string().optional(),
    linkDescriptionEN: z.string().optional(),
    textColor: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, 'invalidColorFormat'),
    backgroundColor: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, 'invalidColorFormat'),
    isPublic: z.coerce.boolean(),
  })
  .refine(
    ({ link, linkDescriptionZH, linkDescriptionEN }) => {
      if (linkDescriptionZH || linkDescriptionEN) {
        if (link) {
          return true;
        }
        return false;
      }
      return true;
    },
    {
      path: ['link'],
      message: 'descriptionNotMatchLink',
    }
  );

export type SmartBarSchema = z.infer<typeof smartBarSchema>;
