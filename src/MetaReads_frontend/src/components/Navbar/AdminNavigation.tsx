import { AiFillBook } from "react-icons/ai";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";
import { Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { getHoverStyle, getMenuItemStyle } from "../Utility/StylingUtility";
import { createUrl } from "../Utility/UrlUtility";
import { useUser } from "../../lib/user_provider";
export default function AdminNavigation() {
  const location = useLocation();
  const { isAdmin } = useUser();
  return (
    <>
      {isAdmin == true && (
        <Menu
          menuItemStyles={{
            button: {
              [`&:hover`]: getHoverStyle(),
              color: "#D1D3D7",
            },
          }}
        >
          <MenuItem
            style={getMenuItemStyle("/admin/genre", location)}
            icon={<AiOutlineUnorderedList size={22} />}
            component={<Link to={createUrl("/admin/genre")} />}
          >
            Genre
          </MenuItem>
          <MenuItem
            style={getMenuItemStyle("/admin/author", location)}
            icon={<BsPeopleFill size={22} />}
            component={<Link to={createUrl("/admin/author")} />}
          >
            Author
          </MenuItem>
          <MenuItem
            style={getMenuItemStyle("/admin/book", location)}
            icon={<AiFillBook size={22} />}
            component={<Link to={createUrl("/admin/book")} />}
          >
            Book
          </MenuItem>
        </Menu>
      )}
    </>
  );
}
