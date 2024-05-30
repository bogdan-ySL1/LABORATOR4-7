import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import SidebarCustom from './layouts/SidebarCustom';
import ContentCustom from './layouts/ContentCustom';
import HeaderCustom from './layouts/HeaderCustom';
import FooterCustom from './layouts/FooterCustom';
import { Layout } from 'antd';
const App = () => {
    return (_jsxs(Layout, { hasSider: true, children: [_jsx(SidebarCustom, {}), _jsxs(Layout, { style: { marginLeft: 200 }, children: [_jsx(HeaderCustom, {}), _jsx(ContentCustom, {}), _jsx(FooterCustom, {})] })] }));
};
export default App;
