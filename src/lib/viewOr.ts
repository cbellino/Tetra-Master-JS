import * as R from "ramda";

export const viewOr = R.curry((defaultValue, lens, obj) =>
  R.pipe(
    R.view(lens),
    R.defaultTo(defaultValue),
  )(obj),
);
