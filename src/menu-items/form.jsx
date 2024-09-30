// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconBrandChrome } from '@tabler/icons-react';

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const icons = {
    IconBrandChrome
};
const formPage = {
    id: 'Form',
    title: <FormattedMessage id="Form" />,
    icon: icons.IconBrandChrome,
    type: 'group',
    url: '/form'
};

export default formPage;
