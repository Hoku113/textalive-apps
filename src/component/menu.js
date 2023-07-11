import Music from "./music"
import React, { useState } from "react"
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Buffer } from "buffer";

const Menu = (records) => {

    const [state, setState] = React.useState({
        right: false,
    })

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ ...state, [anchor]: open});
    }

    const list = (anchor) => (
        <Box
            sx={{width: anchor === "top" || anchor === "buttom" ? "auto" : 300}}
            role="presentation"
            onClick={toggleDrawer(anchor)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {Object.values(records).map((record) => (
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                for(let i; i < record.length ; i++){
                                    
                                }
                                <img src={Buffer.from(record, "base64url").toString()} alt=""></img>
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Box>
    )

    return (
        <div class="menu">

            <div className="menu-bar">
                {["right"].map((anchor) => (
                    <React.Fragment key={{anchor}}>
                        <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                        <SwipeableDrawer
                            anchor={anchor}
                            open={state[anchor]}
                            onClose={toggleDrawer(anchor, false)}
                            onOpen={toggleDrawer(anchor, true)}
                            onDrag={toggleDrawer(anchor, false)}
                        >
                            {list(anchor)}
                        </SwipeableDrawer>
                    </React.Fragment>
                ))}
            </div>

            <Music/>

        </div>
    )
}

export default Menu