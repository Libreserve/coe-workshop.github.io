export type Props = {
  svg?: string;          // raw svg string (preferred)
  src?: string;          // url to fetch (public/)
  width?: number;
  height?: number;
  size?: number;
  color?: string;        // color to embed or omit to use "currentColor"
  className?: string;
  alt?: string;
  fixColor?: boolean;
};

export interface IconProps {
  className?: string;
  color?: string;
  size?: number | string;
}
