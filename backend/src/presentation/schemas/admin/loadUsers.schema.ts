import zod from 'zod';

export const loadUsersSchema = zod.object({ 
    search: zod.string().optional().default(''),
    limit: zod.coerce.number().min(1, 'Limit must be at least 1').default(3).describe('Number of items per page'),
    page: zod.coerce.number().min(1, 'Page must be at least 1').default(1).describe('Page number'),
    sort: zod
      .enum(['joined-latest', 'joined-oldest', 'name-a-z', 'name-z-a'])
      .default('joined-latest')
      .describe('Sort options for users'),
    filter: zod
      .object({
        jobRole: zod.array(zod.string()).optional().default([]), 
        status: zod.array(zod.boolean()).optional().default([]),
        roles: zod.array(zod.string()).optional().default([]),
        verification: zod.array(zod.boolean()).optional().default([]),
      })
      .optional() 
      .default({}), 
  });
  