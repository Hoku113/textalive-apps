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

// record image
import record1 from "../asset/records/record.jpg"
import record2 from "../asset/records/record1.jpg"
import record3 from "../asset/records/record2.jpg"
import record4 from "../asset/records/record3.jpg"
import record5 from "../asset/records/record4.jpg"
import record6 from "../asset/records/record5.jpg"

const Menu = () => {

    const [records, setRecords] = useState([
        record1,
        record2,
        record3,
        record4,
        record5,
        record6,
    ])

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
                {records.map((record) => (
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <img src={record} alt={record}></img>
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