export const classNames = (
  ...inputs: Array<string | number | null | boolean | undefined>
) => inputs.filter(Boolean).join(' ')

type AsProp<T extends React.ElementType> = {
  as?: T
}

type PropsToOmit<T extends React.ElementType, P> = keyof (AsProp<T> & P)

export type PolymorphicComponentProp<
  T extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<T>> &
  Omit<React.ComponentPropsWithoutRef<T>, PropsToOmit<T, Props>>

export type PolymorphicRef<T extends React.ElementType> =
  React.ComponentPropsWithRef<T>['ref']

export type PolymorphicComponentPropWithRef<
  T extends React.ElementType,
  Props = {}
> = PolymorphicComponentProp<T, Props> & { ref?: PolymorphicRef<T> }
