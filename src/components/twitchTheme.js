import {
  deepPurple300, deepPurple500, deepPurple700,
  red300, red500, red700,
  grey300,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const twitchTheme = getMuiTheme({
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: deepPurple500,
    primary2Color: deepPurple300,
    primary3Color: deepPurple700,
    accent1Color: red500,
    accent2Color: red300,
    accent3Color: red700,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: deepPurple500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
  appBar: {
    color: deepPurple500,
    boxShadow: '0 3px 10px #888'
  },
  tabs: {
    backgroundColor: deepPurple300
  }
});

export default twitchTheme;