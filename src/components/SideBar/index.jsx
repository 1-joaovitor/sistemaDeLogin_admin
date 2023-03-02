import { Box, Button, Typography } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import logo from "../../../src/img/tecnologia.png";
import { AuthContext } from "../../contexts/auth";
import "./style.css";
import { useContext, useState } from "react";
export const SideBar = () => {
  const icons = [
    { name: "Users", icon: <GroupIcon /> },
    { name: "Calendário", icon: <CalendarMonthIcon /> },
    { name: "Dashbord", icon: <DashboardIcon /> },
    { name: "Users", icon: <GroupIcon /> },
  ];
  const [classNav, setClassNav] = useState("mobileNavegation");

  const { logout } = useContext(AuthContext);
  const test = () => {
    let open = " mobileNavegation";
    let close = " mobileNavegation123";
    if (classNav === open) {
      setClassNav(close);
    } else {
      setClassNav(open);
    }
  };
  return (
    <>
      <nav id="sidebar" className="sidebar">
        <Box className="title">
          <img src={logo} width={30} height={30} />
          <h2>Poseidon</h2>
          <Box className="open_close_nav_box">
            <Button className="open_close_nav" onClick={test}>
              <OpenInNewIcon />
            </Button>
          </Box>
        </Box>
        <ul className={classNav}>
          {icons.map((item, index) => (
            <li key={index}>
              <Button>
                <span>{item.icon}</span>
                <p>{item.name}</p>
              </Button>
            </li>
          ))}
          <Button className="btn-exit" onClick={logout}>
            <span>
              <ExitToAppIcon />
            </span>{" "}
            <p>Sair</p>
          </Button>
        </ul>
      </nav>
    </>
  );
};
