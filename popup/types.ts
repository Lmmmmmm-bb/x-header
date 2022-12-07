export interface Header {
  name: string;
  value: string;
  disabled: boolean;
}

export interface TabInfo {
  id: string;
  headers: Header[];
}
