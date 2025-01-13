import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useRouter } from "next/router";
// import "font-awesome/css/font-awesome.min.css";
import Image from "next/image";

const Dropdown = (props) => {
  const { subMenu, isOpen, index,handleCompanyClick,setMobileMenuVisible,dropdownTitle } = props;
  const [dropdown, setDropdown] = useState(false);
  const router = useRouter();
  let currentLocation = router.pathname;
  
  
  const handleSubMenuClick = () => {
    setDropdown(false);
    if (setMobileMenuVisible) {
      setMobileMenuVisible(false); // Close mobile menu when dropdown item is clicked
    }
  };


  return (
    <>
     <div className={
          isOpen ? "service-submenu clicked" : "service-submenu not-clicked"
        }>
        <h4>{dropdownTitle}</h4>  
       <ul
        // className={dropdown ? "service-submenu clicked" : "service-submenu"}
        onClick={() => setDropdown(!dropdown)}
      >
        {subMenu &&
          subMenu.map((item) => {
            return (
              <li key={item.url} className="">
                <Link
                  href={item.url}
                 // className="submenu-item"
                  className={`submenu-item  ${currentLocation ==item.url  ? "show-menu-link-open" : ""}` }
                  onClick={handleSubMenuClick}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
      </ul>
      </div>
    </>
  );
};



const Nav = (data) => {
  const menuItems = data.data.headerData.menu.menuItems.nodes;
  const wpLogo =
    data.data.headerData.generalSettings.acfGeneralSettings.webSettings
      .siteLogo;

  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [top, setTop] = useState(true);
  const [isOpen, setIsOpen] = useState(null);
  const [transition, setTransition] = useState(false);
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const setMobileMenuVisible = (isVisible) => {    
    setClick(false);
    const bodyElement = document.querySelector('body');
    bodyElement.classList.toggle('menu-open');
  };

  function getCurrentDimension() {
    return {
      width: typeof window !== "undefined" && window.innerWidth,
    };
  }

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

 // const handleClick = () => setClick(!click);
  const handleClick = () => {
    // Toggle the click state
    setClick(!click);
    const bodyElement = document.querySelector('body');
    bodyElement.classList.toggle('menu-open');
   
  };
  //const Close = () => setClick(false);
  const Close = () => {
    // Toggle the click state
    setClick(false);
    const bodyElement = document.querySelector('body');
    bodyElement.classList.toggle('menu-open');
   
  };

  const router = useRouter();
  let currentLocation = router.pathname;

  useEffect(() => {
    if (router.pathname === "/index") {
      router.push("/404");
    }
  }, []);

  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 50 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  const backBtn = async (e) => {
    if (data && data) {
      e.preventDefault();
      await router.back();
    }
  };

  const style = {
    overflow: "hidden",
    height: transition ? 200 : 36,
    transition: "1s",
  };

  const newstyle = {
    height: -1,
  };
  const handleCompanyClick = (event) => {
    event.preventDefault(); // Prevents the default link behavior (navigation)
  };

  return (
    <>
      {currentLocation === "/contact-us" ? (
        <div className={`main-header  ${!top ? "header-shadow" : ""}`}>
          <Container>
            <div className="header-section d-flex flex-wrap justify-space-between align-items-center">
              <div className="header-logo">
                <Link href="/" className="nav-logo">
                  {wpLogo != null ? (
                    <Image
                      src={wpLogo && wpLogo.mediaItemUrl}
                      alt={
                        wpLogo && wpLogo.altText != "" ? wpLogo.altText : "logo"
                      }
                      height={
                        wpLogo.mediaDetails && wpLogo.mediaDetails.height
                          ? wpLogo.mediaDetails.height
                          : 60
                      }
                      width={
                        wpLogo.mediaDetails && wpLogo.mediaDetails.width
                          ? wpLogo.mediaDetails.width
                          : 225
                      }
                      priority={true}
                    />
                  ) : (
                    ""
                  )}
                </Link>
              </div>
              <div className="header-menu d-flex flex-wrap align-items-center">
                <div className="navbar">
                  <ul>
                    <li className="fillbtn">
                      <Link
                        className=" fill"
                        href={".."}
                        onClick={(e) => backBtn(e)}
                      >
                        Go Back
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </div>
      ) : (
        <div className={`main-header ${!top ? "header-shadow" : ""}`}>
          <Container>
            <div
              className={click ? "main-container" : ""}
              onClick={() => Close()}
            />
            <nav
              className="header-section"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="nav-container">
                <div className="header-logo">
                  <Link href="/" className="nav-logo">
                    {wpLogo != null ? (
                      <Image
                        src={wpLogo && wpLogo.mediaItemUrl}
                        alt={
                          wpLogo && wpLogo.altText != ""
                            ? wpLogo.altText
                            : "logo"
                        }
                        height={
                          wpLogo.mediaDetails && wpLogo.mediaDetails.height
                            ? wpLogo.mediaDetails.height
                            : 60
                        }
                        width={
                          wpLogo.mediaDetails && wpLogo.mediaDetails.width
                            ? wpLogo.mediaDetails.width
                            : 225
                        }
                      />
                    ) : (
                      ""
                    )}
                  </Link>
                </div>

                <ul className={click ? "nav-menu active" : "nav-menu"}>
                  {menuItems.map((item, index) => {
                    if (item.label === "Technology") {
                      // <div className={`table-of-content-mobile ${isMobileTableContent == 1 ? "show" : ""}`}  >
                      return (
                        <>
                          {click && screenSize.width < 992 ? (
                            <li
                              key={item.label}
                              className={`nav-item parent  ${isOpen ==item.cssClasses[0]  ? "show-menu-open" : ""}` }
                              style={
                                isOpen === item.cssClasses ? style : newstyle
                              }                             
                              onClick={(e) => {
                                isOpen === item.cssClasses[0]
                                  ? setIsOpen(null)
                                  : setIsOpen(item.cssClasses[0]);
                                setTransition((prev) => !prev);
                              }}
                            >
                              <Link
                                href={
                                  item.url === "#" || item.url === null
                                    ? "javascript:void(0)"
                                    : item.url
                                }
                                 onClick={() => Close()}
                                className={`nav-links  ${  currentLocation =="/shopify-development" ||   currentLocation =="/woocommerce-development" ||   currentLocation =="/magento-development" ||   currentLocation =="/salesforce-development" || currentLocation =="/services" ? "show-menu-link-open" : ""}` }
                              >
                                {item.label}
                               
                              </Link>
                              {isOpen === item.cssClasses[0] ? (
                                  <i
                                    className="fa fa-chevron-up"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <i
                                    className="fa fa-chevron-down"
                                    aria-hidden="true"
                                  />
                                )}

                              {isOpen === item.cssClasses[0] ? (
                                
                                <Dropdown
                                  subMenu={item.childItems.nodes}
                                  isOpen={item.cssClasses[0]}
                                  index={index}
                                  setMobileMenuVisible={setMobileMenuVisible}
                                  dropdownTitle = {item.label}
                                  
                                />
                              ) : (
                                ""
                              )}
                            </li>
                          ) : (
                            <li key={item.label}  className={`nav-item parent  ${item.cssClasses[0]} ${item.cssClasses[1]}` }>
                              <Link
                                href={
                                  item.url === "#" || item.url === null
                                    ? "javascript:void(0)"
                                    : item.url
                                }
                                className={`nav-links  ${  currentLocation =="/shopify-development" ||   currentLocation =="/woocommerce-development" ||   currentLocation =="/magento-development" ||   currentLocation =="/salesforce-development" || currentLocation =="/services" ? "show-menu-link-open" : ""}` }
                              >
                                {item.label}
                                <span className="down-arrow"></span>
                              </Link>
                              {dropdown && <Dropdown />}
                              <Dropdown subMenu={item.childItems.nodes} setMobileMenuVisible={setMobileMenuVisible}  dropdownTitle = {item.label}/>
                            </li>
                          )}
                        </>
                      );
                    }  else if (item.label === "eCommerce") {
                      // <div className={`table-of-content-mobile ${isMobileTableContent == 1 ? "show" : ""}`}  >
                      return (
                        <>
                          {click && screenSize.width < 992 ? (
                            <li
                              key={item.label}
                              className={`nav-item parent  ${isOpen ==item.cssClasses[0]  ? "show-menu-open" : ""}` }
                              style={
                                isOpen === item.cssClasses ? style : newstyle
                              }                             
                              onClick={(e) => {
                                isOpen === item.cssClasses[0]
                                  ? setIsOpen(null)
                                  : setIsOpen(item.cssClasses[0]);
                                setTransition((prev) => !prev);
                              }}
                            >
                              <Link
                                href={
                                  item.url === "#" || item.url === null
                                    ? "javascript:void(0)"
                                    : item.url
                                }
                                 onClick={() => Close()}
                                className={`nav-links  ${currentLocation =="/ecommerce-development" || currentLocation =="/ecommerce-marketplace-development" || currentLocation =="/ecommerce-website-design" || currentLocation == "/ecommerce-website-package" || currentLocation =="/ecommerce-management-services" || currentLocation == "/ecommerce-consulting-services" || currentLocation =="/b2b-ecommerce-website-development" || currentLocation == "/b2c-ecommerce-website-development" || currentLocation == "/headless-commerce-development" || currentLocation =="/services" ? "show-menu-link-open" : ""}` }
                              >
                                {item.label}
                               
                              </Link>
                              {isOpen === item.cssClasses[0]  ? (
                                  <i
                                    className="fa fa-chevron-up"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <i
                                    className="fa fa-chevron-down"
                                    aria-hidden="true"
                                  />
                                )}

                              {isOpen === item.cssClasses[0] ? (
                                <Dropdown
                                  subMenu={item.childItems.nodes}
                                  isOpen={item.cssClasses[0]}
                                  index={index}
                                  setMobileMenuVisible={setMobileMenuVisible}
                                  
                                />
                              ) : (
                                ""
                              )}
                            </li>
                          ) : (
                            <li key={item.label} className={`nav-item parent  ${item.cssClasses[0]}`}>
                              <Link
                                href={
                                  item.url === "#" || item.url === null
                                    ? "javascript:void(0)"
                                    : item.url
                                }
                                className={`nav-links  ${currentLocation =="/ecommerce-development" || currentLocation =="/ecommerce-marketplace-development" || currentLocation =="/ecommerce-website-design" || currentLocation == "/ecommerce-website-package" || currentLocation =="/ecommerce-management-services" || currentLocation == "/ecommerce-consulting-services" || currentLocation =="/b2b-ecommerce-website-development" || currentLocation == "/b2c-ecommerce-website-development" || currentLocation == "/headless-commerce-development" || currentLocation =="/services" ? "show-menu-link-open" : ""}` }
                              >
                                {item.label}
                                <span className="down-arrow"></span>
                              </Link>
                              {dropdown && <Dropdown />}
                              <Dropdown subMenu={item.childItems.nodes} setMobileMenuVisible={setMobileMenuVisible} dropdownTitle = {item.label}/>
                            </li>
                          )}
                        </>
                      );
                    } else if (item.label === "Company") {
                      return (
                        <>
                          {click && screenSize.width < 992 ? (
                            <li
                              key={item.label+isOpen}
                              className={`nav-item parent  ${isOpen ==item.cssClasses[0]  ? "show-menu-open" : ""}`}
                              style={
                                isOpen === item.cssClasses ? style : newstyle
                              }                             
                              onClick={(e) => {
                                isOpen === item.cssClasses[0]
                                  ? setIsOpen(null)
                                  : setIsOpen(item.cssClasses[0]);
                                setTransition((prev) => !prev);
                              }}
                            >
                              <Link
                                href={
                                  item.url === "#" || item.url === null
                                    ? "#"
                                    : item.url
                                }
                                className={`nav-links  ${currentLocation =="/about-us" ||   currentLocation =="/testimonials" ||   currentLocation =="/infrastructure"  ||   currentLocation =="/culture-values" ? "show-menu-link-open" : ""}` }
                                onClick={handleCompanyClick}
                              >
                                {item.label}
                               
                              </Link>
                              {isOpen === item.cssClasses[0] ? (
                                  <i
                                    className="fa fa-chevron-up"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <i
                                    className="fa fa-chevron-down"
                                    aria-hidden="true"
                                  />
                                )}

                              {isOpen === item.cssClasses[0] ? (
                                <Dropdown
                                  subMenu={item.childItems.nodes}
                                  isOpen={item.cssClasses[0]}
                                  index={index}
                                  handleCompanyClick={handleCompanyClick}
                                  setMobileMenuVisible={setMobileMenuVisible}
                                  dropdownTitle = {item.label}
                                />
                              ) : (
                                ""
                              )}                              
                            </li>
                          ) : (
                            <li key={item.label}  className={`nav-item parent  ${item.cssClasses[0]} ${item.cssClasses[1]}`}>
                              <Link
                                href={
                                  item.url === "#" || item.url === null
                                    ? "#"
                                    : item.url
                                }
                                className={`nav-links  ${currentLocation =="/about-us" ||   currentLocation =="/testimonials" || currentLocation =="/infrastructure"  ||   currentLocation =="/culture-values" ? "show-menu-link-open" : ""}` }
                                onClick={handleCompanyClick}
                              >
                                {item.label}
                                <span className="down-arrow"></span>
                              </Link>
                              {dropdown && <Dropdown />}
                              <Dropdown subMenu={item.childItems.nodes} dropdownTitle = {item.label}/>
                            </li>
                          )}
                        </>
                      );
                    } else if (item.label === "Hire eCommerce") {
                      return (
                        <>
                          {click && screenSize.width < 992 ? (
                            <li
                              key={item.label}
                              className={`nav-item parent  ${isOpen ==item.cssClasses[0]  ? "show-menu-open" : ""}`}
                              style={
                                isOpen === item.cssClasses ? style : newstyle
                              }
                              onClick={(e) => {
                                isOpen === item.cssClasses[0]
                                  ? setIsOpen(null)
                                  : setIsOpen(item.cssClasses[0]);
                                setTransition((prev) => !prev);
                              }}
                            >
                              <Link
                                href={
                                  item.url === "#" || item.url === null
                                    ? "javascript:void(0)"
                                    : item.url
                                }
                                className={`nav-links  ${currentLocation =="/hire-ecommerce-developers" ||   currentLocation =="/hire-woocommerce-developers" ||   currentLocation =="/hire-shopify-developers"   ||   currentLocation =="/hire-magento-developers" ? "show-menu-link-open" : ""}` }
                                onClick={() => Close()}
                              >
                                {item.label}
                               
                              </Link>
                              {isOpen === item.cssClasses[0] ? (
                                  <i
                                    className="fa fa-chevron-up"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <i
                                    className="fa fa-chevron-down"
                                    aria-hidden="true"
                                  />
                                )}

                              {isOpen === item.cssClasses[0] ? (
                                <Dropdown
                                  subMenu={item.childItems.nodes}
                                  isOpen={item.cssClasses[0]}
                                  index={index}
                                  setMobileMenuVisible={setMobileMenuVisible}
                                />
                              ) : (
                                ""
                              )}
                            </li>
                          ) : (
                            <li key={item.label} className="nav-item parent">
                              <Link
                                href={
                                  item.url === "#" || item.url === null
                                    ? "javascript:void(0)"
                                    : item.url
                                }
                                className={`nav-links  ${currentLocation =="/hire-ecommerce-developers" ||   currentLocation =="/hire-woocommerce-developers" ||   currentLocation =="/hire-shopify-developers"  ||   currentLocation =="/hire-magento-developers" ? "show-menu-link-open" : ""}` }
                                
                              >
                                {item.label}
                                <span className="down-arrow"></span>
                              </Link>
                              {dropdown && <Dropdown />}
                              <Dropdown subMenu={item.childItems.nodes} dropdownTitle = {item.label}/>
                            </li>
                          )}
                        </>
                      );
                    }
                    return (
                      <li
                        key={item.label}
                        // className={`nav-item custom-item ${item.cssClasses[0]}`}
                        className="nav-item custom-item"
                      >
                        <Link
                          href={
                            item.url === "#" || item.url === null
                              ? "javascript:void(0)"
                              : item.url
                          }
                          className={`nav-links ${item.cssClasses[0]} ${currentLocation ==item.url  ? "show-menu-link-open" : ""}` }
                           onClick={() => Close()}
                        >
                          {item.label}
                          
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <div className="nav-icon" onClick={handleClick}>
                  <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
                </div>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </>
  );
};

export default Nav;
