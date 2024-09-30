// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconListDetails } from '@tabler/icons-react';

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const icons = {
    IconListDetails
};
const formDetailList = {
    id: 'Health Form List',
    title: <FormattedMessage id="Health Form List" />,
    icon: icons.IconListDetails,
    type: 'group',
    url: '/form/list'
};

export default formDetailList;
