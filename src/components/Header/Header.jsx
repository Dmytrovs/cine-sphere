import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { LuSearch, LuX, LuMenu } from "react-icons/lu";
import style from "./Header.module.css";

function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // mobile scroll logic
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      // On the desktop, disable smart hiding (always visible)
      if (window.innerWidth > 767.98) {
        setIsHidden(false);
        return;
      }

      const currentScrollY = window.scrollY;
      const scrollDifference = currentScrollY - lastScrollY;

      //Ignore micro-scroll jerks for smoothness
      if (Math.abs(scrollDifference) < 10) return;

      // If we scroll down and scroll more than 60px, we hide the header
      if (scrollDifference > 0 && currentScrollY > 60) {
        // If the search or menu is open, close them first
        //  leave the cap in place (so that there are no sudden jumps in one frame)
        if (isSearchOpen || isMenuOpen) {
          setIsSearchOpen(false);
          setIsMenuOpen(false);
        } else {
          // If everything is closed, hide the header
          setIsHidden(true);
        }
      }
      // If we scroll UP, we always show the header
      else if (scrollDifference < 0) {
        setIsHidden(false);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSearchOpen, isMenuOpen]);

  // Lock page scroll only when the burger menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className={`${style.header} ${isHidden ? style.headerHidden : ""}`}>
      <div className={`container ${style.headerContainer}`}>
        <div className={style.headerTop}>
          <div className={style.wrapperLeft}>
            <NavLink to="/" className={style.logo}>
              <span>C</span>ine <span>S</span>phere
            </NavLink>

            <nav className={`${style.nav} ${isMenuOpen ? style.navOpen : ""}`}>
              <ul className={style.navList}>
                <li>
                  <NavLink
                    to="/upcoming"
                    className={({ isActive }) =>
                      isActive ? style.active : undefined
                    }
                  >
                    Upcoming
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/shows"
                    className={({ isActive }) =>
                      isActive ? style.active : undefined
                    }
                  >
                    Shows
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/fanart"
                    className={({ isActive }) =>
                      isActive ? style.active : undefined
                    }
                  >
                    Fanart
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/plans"
                    className={({ isActive }) =>
                      isActive ? style.active : undefined
                    }
                  >
                    Plans
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/community"
                    className={({ isActive }) =>
                      isActive ? style.active : undefined
                    }
                  >
                    Community
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/account"
                    className={({ isActive }) =>
                      isActive ? style.active : undefined
                    }
                  >
                    Account
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>

          {/* Right side: Search + Burger*/}
          <div className={style.actions}>
            {/* Magnifying glass button for mobile (opens the second row) */}
            {!isSearchOpen && (
              <button
                type="button"
                className={style.mobileSearchToggleBtn}
                onClick={() => setIsSearchOpen(true)}
                aria-label="Open Search"
              >
                <LuSearch size={24} />
              </button>
            )}

            {/* Desktop search form always visible on large screens */}
            <form
              className={style.searchForm}
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Searching for:", searchQuery);
              }}
            >
              <div className={style.searchBox}>
                <button
                  type="submit"
                  className={style.searchBtn}
                  aria-label="Search"
                >
                  <LuSearch size={42} />
                </button>
                <div className={style.inputWrapper}>
                  <input
                    type="text"
                    placeholder="Search movies, shows..."
                    className={style.searchInput}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />

                  {searchQuery && (
                    <button
                      type="button"
                      className={style.clearBtn}
                      onClick={() => setSearchQuery("")}
                      aria-label="Clear search"
                    >
                      <LuX size={16} />
                    </button>
                  )}
                </div>
              </div>
            </form>

            {/* Burger */}
            <button
              type="button"
              className={style.menuBtn}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <LuX size={28} /> : <LuMenu size={28} />}
            </button>
          </div>
        </div>

        {/* ROW 2: Full-size search for mobile (appears at the bottom) */}
        {isSearchOpen && (
          <div className={style.mobileSearchRow}>
            <form
              className={style.mobileSearchForm}
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Searching for:", searchQuery);
              }}
            >
              <div className={style.mobileInputWrapper}>
                <LuSearch size={20} className={style.mobileSearchIcon} />
                <input
                  type="text"
                  placeholder="Search movies, shows..."
                  className={style.mobileSearchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    className={style.clearBtn}
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                  >
                    <LuX size={16} />
                  </button>
                )}
              </div>
              <button
                type="button"
                className={style.cancelSearchBtn}
                onClick={() => setIsSearchOpen(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
