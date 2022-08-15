import { useCallback, useState } from "react";
import { SwipeableDrawer, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { SettingsList } from '../SettingsList/SettingsList'

export const Settings = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = useCallback((open) => {
        setIsOpen(open);
    }, [setIsOpen]);

    return(
        <div>
            <Button
                size="large"
                color="inherit"
                onClick={() => toggleDrawer(true)}
            >
                <MenuIcon />
            </Button>
            <SwipeableDrawer
                anchor={'right'}
                open={isOpen}
                onClose={() => toggleDrawer(false)}
                onOpen={() => toggleDrawer(true)}
            >
                <SettingsList 
                    onBoxClick={toggleDrawer} 
                />               
            </SwipeableDrawer>
        </div>
    );
}