// Importing necessary components and icons from Material-UI
import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import EventIcon from "@mui/icons-material/Event";
import CustomersIcon from "@mui/icons-material/PeopleAlt";
import TagsIcon from "@mui/icons-material/LocalOffer";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ManageCustomer from "./sidebar_component/Manage.customer";
import ManageUsers from "./sidebar_component/Manage.users";
import Dashboard from "./sidebar_component/Dashboard";

// Width of the sidebar drawer
const drawerWidth = 240;

// Styling for the drawer component
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  background: "#5f1397",
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    backgroundColor: "#5f1397",
    fontWeight: "bold",
  },
}));

// Styling for the logo container
const LogoContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: (theme) => theme.spacing(1),
});

// Styling for the logo image
const Logo = styled("img")({
  width: "80%",
  height: "auto",
  marginTop: "10px",
  maxWidth: "150px",
});

// Sidebar component
export default function Sidebar() {
  const [selectedOption, setSelectedOption] = React.useState("Manage Customers");
  const [show, setShow] = useState(true);

  // Function to handle option clicks and update selectedOption state
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  // Function to render the appropriate component based on the selectedOption state
  const renderComponent = () => {
    switch (selectedOption) {
      case "Dashboard":
        return <Dashboard />;
      case "Manage Users":
        return <ManageUsers />;
      case "Manage Customers":
        return <ManageCustomer />;
      default:
        return null;
    }
  };

  // Function to handle clicks on the component and toggle visibility
  const handleComponentClick = () => {
    setShow(false);
  };

  return (
    <div style={{ display: "flex", background: "#f0f0f0" }}>
      {/* Menu icon to toggle sidebar visibility */}
      <MenuIcon
        sx={{ margin: "20px", marginTop: "32px", display: !show ? "" : "none",cursor:"pointer" }}
        fontSize="medium"
        onClick={() => setShow(true)}
      />
      {/* Sidebar drawer */}
      <StyledDrawer
        variant="permanent"
        anchor="left"
        style={{ display: show ? "" : "none" }}
      >
        {/* Logo */}
        <LogoContainer>
          <Logo src={require("../logo.png")} alt="Logo" />
        </LogoContainer>
        {/* List of options */}
        <List style={{ lineHeight: "2", color: "white" }}>
          {[
            { text: "Dashboard", icon: <DashboardIcon /> },
            { text: "Manage Users", icon: <PeopleIcon /> },
            { text: "Settings", icon: <SettingsIcon /> },
            { text: "Events", icon: <EventIcon /> },
            { text: "Manage Customers", icon: <CustomersIcon /> },
            { text: "Manage Tags", icon: <TagsIcon /> },
            { text: "Logout", icon: <LogoutIcon /> },
          ].map(({ text, icon }) => (
            <ListItem
              key={text}
              button
              onClick={() => handleOptionClick(text)}
              style={{
                backgroundColor:
                  selectedOption === text ? "#440175" : "transparent",
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </StyledDrawer>
      <div onClick={handleComponentClick}>{renderComponent()}</div>
    </div>
  );
}
