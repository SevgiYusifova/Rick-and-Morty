import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

const theme = responsiveFontSizes(createMuiTheme({
    props: {
        MuiButtonBase: {
            disableRipple: true
        }
    },
    palette: {
        primary: {
            main: '#D9b48FFF'
        },
        secondary: {
            main: '#D9b48FFF'
        }
    }
}));

export default theme;