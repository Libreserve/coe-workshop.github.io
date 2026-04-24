export interface MenuMapProps {
  title: string;
  path: string;
}

export interface navSlideProps {
  menuMapPropsList: MenuMapProps[];
  opened: boolean;
  onClose: () => void;
}
