export interface Country {
  idd: {
    root: string;
    suffixes: string[];
  };
  name: {
    common: string;
    official: string;
  };
  flag: string;
}
