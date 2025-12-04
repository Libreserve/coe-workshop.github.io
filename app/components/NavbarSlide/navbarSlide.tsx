import { NavbarSlideProps } from "./types";

const NavbarSlide = ({ opened }: NavbarSlideProps) => {
  return (
    <div>
      {opened && (
        <div>
          <div>
            <div></div>
            <ul>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarSlide;
