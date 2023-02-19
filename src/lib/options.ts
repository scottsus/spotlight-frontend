export class FilterOptions {
  minPrice: number;
  maxPrice: number;
  numTicketsArr: string[];
  chosenWebsites: string[];
}

export class SortByOptions {
  isAscending: boolean;
}

class Options {
  filterOptions: FilterOptions;
  sortByOptions: SortByOptions;
}

export default Options;
