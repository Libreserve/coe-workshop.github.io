export interface BlogProps {
  cover: string;
  title: string;
  url: string;
}

export interface AdminProps {
  profile: string;
  title: string;
  name: string;
  email: string;
  icon: string;
}
export interface MenuMapProps {
  title: string;
  path: string;
}

export interface NavSlideProps {
  menuMapPropsList: MenuMapProps[];
  onClose: () => void;
}
