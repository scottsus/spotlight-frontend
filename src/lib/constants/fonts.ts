// Importing fonts using chrome.runtime.getURL
// __MSG@@extension_id is not working 😩😩

const montBoldURL = chrome.runtime.getURL('fonts/MontBold.otf');
const montSemiBoldUrl = chrome.runtime.getURL('fonts/Mont-SemiBold.otf');
const manropeURL = chrome.runtime.getURL('fonts/Manrope.ttf');
const helveticaLightURL = chrome.runtime.getURL(
  'fonts/HelveticaNeue Light.ttf'
);
const helveticaRegularURL = chrome.runtime.getURL(
  'fonts/HelveticaNeue Medium.ttf'
);

const fonts = `
@font-face {
    font-family: 'Mont';
    src: url(${montSemiBoldUrl}) format('opentype');
    font-weight: 700;
}

@font-face {
  font-family: 'Mont';
  src: url(${montBoldURL}) format('opentype');
  font-weight: 800;
}

@font-face {
    font-family: 'Manrope';
    src: url(${manropeURL}) format('truetype');
    font-weight: 100 800;
}

@font-face {
    font-family: 'HelveticaNeue';
    src: url(${helveticaLightURL}) format('truetype');
    font-weight: 300;
}

@font-face {
    font-family: 'HelveticaNeue';
    src: url(${helveticaRegularURL}) format('truetype');
    font-weight: 500;
}
`;

export default fonts;
