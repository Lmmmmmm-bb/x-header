export interface Header {
  name: string;
  value: string;
  disabled: boolean;
}

export interface TabInfo {
  no: number;
  id: string;
  title: string;
  headers: Header[];
}
