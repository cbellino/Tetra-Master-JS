import * as R from "ramda";

// TODO: I would love to make this into a curried function,
// but i don't know how to do this and keep the generic return type.
export function viewOr<T>(defaultValue: any, lens: R.Lens) {
  return (obj: object): T =>
    R.pipe(
      R.view(lens),
      R.defaultTo(defaultValue),
    )(obj);
}
