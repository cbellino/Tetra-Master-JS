import { viewOr } from "../../lib";
import { Grid, Selector } from "../../models";
import { boardGridLens } from "./board.lenses";

export const getBoardGrid: Selector<Grid> = viewOr([], boardGridLens);
