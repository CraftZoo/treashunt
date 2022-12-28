import type { z } from 'zod'

export type inferSafeParseErrors<
  T extends z.ZodType<any, any, any>,
  U = string
> = {
  formError: U
  fieldErrors: {
    [P in keyof z.infer<T>]?: U[]
  }
}

export { sanitize as HTMLSanitizer } from 'isomorphic-dompurify'
