import zod from 'zod';

export const LoadCandidatesValidator = zod.object({
  search: zod.string().optional(),
  limit: zod.coerce.number().describe('Limit can not be empty'),
  page: zod.coerce.number().describe('Page can not be empty'),
  sort: zod
    .enum(['joined-latest', 'joined-oldest', 'name-a-z', 'name-z-a'])
    .describe('Sort options are not valid'),
  filter: zod
    .object({
      jobRole: zod.array(zod.string()),
      status: zod.array(zod.boolean()),
    })
    .optional(),
});
