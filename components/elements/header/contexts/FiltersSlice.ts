import { createContext } from "react";
import { Filter } from "~/types/Filter";

export const FiltersContext = createContext<Filter | null>(null);
