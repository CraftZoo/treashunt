import * as React from 'react'

import type {
  PolymorphicComponentPropWithRef,
  PolymorphicRef,
} from '~/utils/style'
import { classNames } from '~/utils/style'

type ButtonProps<T extends React.ElementType> = PolymorphicComponentPropWithRef<
  T,
  {
    variant?: 'primary' | 'secondary' | 'outline' | 'destructive'
    size?: 'xs' | 'sm' | 'md' | 'lg'
    className?: string
  }
>

const Button = React.forwardRef(
  <T extends React.ElementType = 'button'>(
    {
      as,
      variant = 'primary',
      size = 'lg',
      className,
      ...delegated
    }: ButtonProps<T>,
    ref?: PolymorphicRef<T>
  ) => {
    const Component = as ?? 'button'

    return (
      <Component
        ref={ref}
        className={classNames(
          'btn',
          variant === 'primary' && 'btn-primary',
          variant === 'secondary' && 'btn-secondary',
          variant === 'outline' && 'btn-outline',
          variant === 'destructive' && 'btn-destructive',
          size === 'xs' && 'btn-xs',
          size === 'sm' && 'btn-sm',
          size === 'md' && 'btn-md',
          size === 'lg' && 'btn-lg'
        )}
        {...delegated}
      />
    )
  }
)

Button.displayName = 'Button'

export default Button
