export interface TabsOption {
  options?: string;
  icon?: string;
  action?: () => void;
  isSelect: boolean;
}

export interface TabsProps {
  TabsOptions: TabsOption[];
}
