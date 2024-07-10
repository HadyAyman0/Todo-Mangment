import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  PowerIcon,
  Bars2Icon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { UserTokenActions } from "../../app/UserToken.slice";
import { actions } from "../../app/GoogleToken.slice";

// profile menu component
const profileMenuItems = [
  {
    icon: PowerIcon,
    label : ""
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { t } = useTranslation()
  const closeMenu = () => setIsMenuOpen(false);
  const { LogOut } = UserTokenActions;
  const {SetResponse} = actions
  const dispatch = useDispatch();
  const {response} = useSelector(function(store){
    return store.googleToken;
  })
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
       
         
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src={response === null ? "https://cdn-icons-png.flaticon.com/512/149/149071.png" : response.picture}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
              }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => {
                closeMenu;
                dispatch(LogOut());
                dispatch(SetResponse(null))
              }}
              className={`flex  items-center gap-2 rounded ${isLastItem
                ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                : ""
                }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}

              >
                {t("Sign out")}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

function MenuLanguage() {

  const { i18n, t } = useTranslation();
  const changlanguage = (lng) => {
    i18n.changeLanguage(lng)
  }
  return <>
    <section className=" m-6 mt-6 md:mb-0 md:mt-0">
      <Menu >
        <MenuHandler >
          <Button className="bg-[#183D3D] font-Arsenal p-2 ">{t("Language")}</Button>
        </MenuHandler>
        <MenuList>
          <MenuItem className="font-Arsenal" onClick={() => {
            changlanguage('ar')
          }}>{t("Arabic")}</MenuItem>
          <MenuItem className="font-Arsenal" onClick={() => {
            changlanguage('en')

          }}>{t("English")}</MenuItem>
        </MenuList>
      </Menu>
    </section>
  </>
}

export function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const { t } = useTranslation()

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);

  const { usertoken } = useSelector(function (store) {
    return store.UserToken
  })

  return (
    <>
      <Navbar className="  sticky  bg-[#000000] p-3  h-full shadow-none top-0 z-50  mx-auto border-none rounded-none   ">
        <div className="container bg-opacity-0  shadow-none">
          <div className="relative mx-auto flex items-center shadow-none justify-between p-0  text-[#5C8374]">
            <Typography
              as="a"
              href="#"
              className="mr-4 ml-2 uppercase font-Arsenal font-extrabold md:text-2xl appenglish   py-1.5 "
            >
              <span className="text-[#EEEDEB]">TODO <span className="text-[#735F32]">management</span></span>
            </Typography>
            <div className="hidden lg:block lg:ml-5">
              <MenuLanguage />
            </div>

            <div className="ml-auto items-center flex gap-4">
              <IconButton
                size="sm"
                color="blue-gray"
                variant="text"
                onClick={toggleIsNavOpen}
                className="ml-auto mr-2  lg:hidden"
              >
                <Bars2Icon className="h-6 w-8" />
              </IconButton>
              {usertoken === null ? <div className="flex gap-3">
                <Button size="sm" variant="text" className=" text-white border-[1px] font-Arsenal  rounded-xl">
                  <Link to="/auth/login">{t("Login")}</Link>
                </Button>
                <Button size="sm" variant="text" className=" text-white border-[1px]  font-Arsenal  rounded-xl">
                  <Link to="/auth/signin">{t("Sign in")}</Link>
                </Button>
              </div> :   <ProfileMenu />}           
            </div>
          </div>
        </div>
        <Collapse open={isNavOpen} className="flex items-center">
          <MenuLanguage />
        </Collapse>
      </Navbar>
    </>
  );
}