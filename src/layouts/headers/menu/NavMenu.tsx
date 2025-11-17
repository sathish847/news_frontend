import getMenuData from "@/data/MenuData";
import Link from "next/link.js";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

// Define MenuItem interface
interface MenuItem {
    id: number;
    title: string;
    link: string;
    has_dropdown: boolean;
    sub_menus?: {
        link: string;
        title: string;
        mega_dropdown: boolean;
        mega_menus?: {
            link: string;
            title: string;
        }[];
    }[];
}

const NavMenu = () => {
    const [activeMenus, setActiveMenus] = useState<{ [key: string]: boolean }>({});
    const [menuData, setMenuData] = useState<MenuItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const currentRoute = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        getMenuData().then((data) => {
            setMenuData(data);
            setIsLoading(false);
        });
    }, []);

    const getCurrentFullPath = () => {
        const search = searchParams.toString();
        return currentRoute + (search ? '?' + search : '');
    };

    const isMenuItemActive = (menuLink: string) => {
        return getCurrentFullPath() === menuLink;
    };

    const isSubMenuItemActive = (subMenuLink: string) => {
        return getCurrentFullPath() === subMenuLink;
    };

    const toggleMenu = (menuTitle: string) => {
        setActiveMenus((prevActiveMenus) => ({
            ...prevActiveMenus,
            [menuTitle]: !prevActiveMenus[menuTitle],
        }));
    };

    const isMenuActive = (menu: MenuItem) => {
        if (isMenuItemActive(menu.link)) return true;
        if (menu.sub_menus) {
            return menu.sub_menus.some((subMenu) => isSubMenuItemActive(subMenu.link));
        }
        return false;
    };

    // Split menu items: first 4 categories + Home, rest go to "More" dropdown
    const visibleMenuItems = menuData.slice(0, 5); // Home + 4 categories
    const moreMenuItems = menuData.slice(5); // Remaining categories

    const moreMenuItem: MenuItem = {
        id: 999,
        title: "மேலும்",
        link: "#",
        has_dropdown: moreMenuItems.length > 0,
        sub_menus: moreMenuItems.map(item => ({
            link: item.link,
            title: item.title,
            mega_dropdown: false
        }))
    };

    if (isLoading) {
        return (
            <ul className="navigation">
                {[...Array(6)].map((_, index) => (
                    <li key={index} className="skeleton-menu-item">
                        <div className="skeleton-text"></div>
                    </li>
                ))}
            </ul>
        );
    }

    const renderMenuItem = (menu: MenuItem) => (
        <li
            key={menu.id}
            className={` ${menu.has_dropdown ? "menu-item-has-children" : ""} ${isMenuActive(menu) ? "active" : ""
                }`}
        >
            <Link href={menu.link}>
                {menu.title}
            </Link>
            {menu.has_dropdown && (
                <div
                    className="dropdown-btn"
                    onClick={() => toggleMenu(menu.title)}
                >
                    <span className="fas fa-angle-down"></span>
                </div>
            )}
            {menu.has_dropdown && (
                <ul className={`sub-menu ${activeMenus[menu.title] ? "show" : ""}`}>
                    {menu.sub_menus &&
                        menu.sub_menus.map((subMenu: { link: string; title: string; mega_dropdown: boolean; mega_menus?: { link: string; title: string; }[] | undefined }) => (
                            <li
                                key={subMenu.title}
                                className={`${subMenu.mega_dropdown ? "menu-item-has-children" : ""} ${isSubMenuItemActive(subMenu.link) ? "active" : ""
                                    }`}
                            >
                                <Link href={subMenu.link}>
                                    <span>{subMenu.title}</span>
                                </Link>
                                {subMenu.mega_dropdown && (
                                    <div
                                        className="dropdown-btn"
                                        onClick={() => toggleMenu(subMenu.title)}
                                    >
                                        <span className="fas fa-angle-down"></span>
                                    </div>
                                )}
                                {subMenu.mega_dropdown && (
                                    <ul
                                        className={`sub-menu ${activeMenus[subMenu.title] ? "show" : ""
                                            }`}
                                    >
                                        {subMenu.mega_menus &&
                                            subMenu.mega_menus.map((megaMenu: { link: string; title: string }) => (
                                                <li
                                                    key={megaMenu.title}
                                                    className={`${megaMenu.link &&
                                                        isSubMenuItemActive(megaMenu.link)
                                                        ? "active"
                                                        : ""
                                                        }`}
                                                >
                                                    <Link href={megaMenu.link}>
                                                        <span>{megaMenu.title}</span>
                                                    </Link>
                                                </li>
                                            ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                </ul>
            )}
        </li>
    );

    return (
        <ul className="navigation">
            {visibleMenuItems.map(renderMenuItem)}
            {moreMenuItems.length > 0 && renderMenuItem(moreMenuItem)}
        </ul>
    );
};

export default NavMenu;
