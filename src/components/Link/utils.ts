import { className } from "utils/functions/className";

/**
 * Identifies current path and sets active class name to <a/> tag
 *
 * @example
 * <nav>
 *     <NavLink to="/" className="nav-link" activeClassName="active-link">
 *         Home
 *     </NavLink>
 *     <NavLink to="/about" className="nav-link" activeClassName="active-link">
 *         About
 *     </NavLink>
 *     <NavLink to="/contact" className="nav-link" activeClassName="active-link">
 *         Contact
 *     </NavLink>
 * </nav>
 *
 * @param pathname - The path to check against the current path
 * @param _className - The class name to apply to the <a/> tag
 * @param _activeClassName - The class name to apply when the path is active
 * @returns The class name to apply to the <a/> tag
 */
export function activeClassDetector(pathname: string, _className: string, _activeClassName?: string): string {
    const currentPathname = "/" + location.pathname.split("/").filter(Boolean).join("/");
    return className(_className, {
        [_activeClassName ?? "active"]: currentPathname === pathname,
    });
}
