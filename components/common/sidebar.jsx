import React, { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHome,
  faBook,
  faLanguage,
  faQuoteLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import cx from "classnames";
import "./sidebar.css";
import { usePathname } from "next/navigation";
import Link from "next/link";

const menuItems = [
  { title: "Dashboard", icon: faHome },
  { title: "Book", icon: faBook },
  { title: "Quotation", icon: faQuoteLeft },
  { title: "Vocabulary", icon: faLanguage },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  console.log(pathname);
  const nodeRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={cx("sidebar", { "sidebar-closed": !isOpen })}>
      <button
        className={cx("sidebar_button", { rotate: isOpen })}
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>

      <div className="profile_section">
        <div className="profile_picture">
          <Image
            alt="profile_picture"
            src="next.svg"
            height={100}
            width={100}
          ></Image>
        </div>
        <div className="profile_name">
          <CSSTransition
            in={isOpen}
            timeout={200}
            classNames={"fade"}
            unmountOnExit
            nodeRef={nodeRef}
          >
            <p>Raihan Rafif</p>
          </CSSTransition>
        </div>
      </div>
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.title}
            className={`sidebar_listItem ${
              pathname === `/${item.title.toLowerCase()}` ? "active" : ""
            }`}
          >
            <Link className={"sidebar_divItem"} href={`${item.title.toLowerCase()}`}>
              <FontAwesomeIcon className={"sidebar_icon"} icon={item.icon} />
              <CSSTransition
                in={isOpen}
                timeout={200}
                classNames={"fade"}
                unmountOnExit
                nodeRef={nodeRef}
              >
                <p>{item.title}</p>
              </CSSTransition>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
