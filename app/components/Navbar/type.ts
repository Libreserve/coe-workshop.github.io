export interface MenuMapProps {
  title: string;
  path: string;
}

export interface navSlideProps {
  menuMapPropsList: MenuMapProps[];
  onClose: () => void;
}
