import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Const from '../../const';

const colors = require('../../colors.json');

function NavIcons({ label, focused }) {
    const size = Const.TABBAR_ICON_SIZE;
    const color = focused ? colors.primary : colors.darkBackground;

    switch (label) {
        case 'Home':
        return <MaterialCommunityIcons name="home" color={color} size={size} />;
        case 'Team':
        return <MaterialCommunityIcons name="contacts" color={color} size={size} />;
        case 'Setting':
        return <MaterialCommunityIcons name="badge-account-horizontal" color={color} size={size} />;
        case 'Search':
        return <MaterialCommunityIcons name="magnify" color={color} size={size} />;
        default:
        return null;
    }
}

export default NavIcons;
