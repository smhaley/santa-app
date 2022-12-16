import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { ReactComponent as Santa } from "../assets/santa.svg";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import styled from "@emotion/styled";
import useMediaQuery from "@mui/material/useMediaQuery";

type Page = { name: string; key: string };

const WeightedTab = styled(Tab)`
  font-weight: 600;
  letter-spacing: 0.05rem;
`;

const StyleAppBar = styled(AppBar)`
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.primary.dark};

  .santa {
    width: 50px;
    height: 50px;
  }
`;

const TabContainer = styled.div`
  margin-left: auto;
  display: flex;
`;

const pages: Page[] = [
  { name: "Tracker Home", key: "tracker" },
  { name: "FAQ", key: "faq" },
];
const logo = <Santa className="santa" />;

interface NavigationProps {
  setLocation: React.Dispatch<React.SetStateAction<string>>;
}

const Navigation: React.FC<NavigationProps> = ({ setLocation }) => {
  const smMatch = useMediaQuery("(min-width:600px)");
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [currentNav, setCurrentNav] = React.useState(0);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    const { value } = event.currentTarget.dataset;
    if (value) {
      const tabKey = pages.findIndex((pageObj) => pageObj.key === value);
      setCurrentNav(tabKey);

      setLocation(value);
    }
    setAnchorElNav(null);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    newValue !== currentNav && setCurrentNav(newValue);
    setLocation(pages[newValue].key);
  };

  return (
    <StyleAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}>
            {logo}
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              {anchorElNav ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              {pages.map((page: Page) => (
                <MenuItem
                  key={page.name}
                  data-value={page.key}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "flex", sm: "none" } }}
          >
            {logo}
          </Typography>
          {smMatch && (
            <Box sx={{ flexGrow: 1, display: "flex" }}>
              <TabContainer>
                <Tabs
                  value={currentNav}
                  onChange={handleTabChange}
                  indicatorColor="secondary"
                  textColor="inherit"
                  aria-label={`${currentNav} tab`}
                >
                  {pages.map((page: Page) => (
                    <WeightedTab key={page.key + "weight"} label={page.name} />
                  ))}
                </Tabs>
              </TabContainer>
            </Box>
          )}
        </Toolbar>
      </Container>
    </StyleAppBar>
  );
};
export default Navigation;
