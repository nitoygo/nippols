import { connect } from 'react-redux';
import { Layout } from 'react-admin';

const darkTheme = {
    palette: {
        type: 'dark',
    }
};

const lightTheme = {
    palette: {
        secondary: {
            light: '#5f5fc4',
            main: '#283593',
            dark: '#001064',
            contrastText: '#fff',
        },
    },
};

export default connect(
    state => ({
        theme: state.theme === 'dark' ? darkTheme : lightTheme,
    }),
    {}
)(Layout);
