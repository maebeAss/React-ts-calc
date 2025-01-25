import { MenuItem } from "../types";

interface MenuProps {
    menuItems: MenuItem[];
    onClick?: (menuItem: MenuItem) => void;
}

export default function Menu({ menuItems, onClick }:MenuProps) {
    return (
    <div>
        {menuItems.map((menuItem) => (
                <a href="#" key={menuItem} onClick={() => onClick?.(menuItem)}>
                    {menuItem}
                </a>
            ))}
    </div>
    );
}