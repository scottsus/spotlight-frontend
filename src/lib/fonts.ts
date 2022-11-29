// Importing fonts using chrome.runtime.getURL
// __MSG@@extension_id is not working 😩😩

const montBoldURL = chrome.runtime.getURL('fonts/MontBold.otf');
const manropeURL = chrome.runtime.getURL('fonts/Manrope.ttf');
const helveticaLightURL = chrome.runtime.getURL('fonts/HelveticaLight.ttf');
const helveticaMediumURL = chrome.runtime.getURL('fonts/HelveticaMedium.ttf');

const fonts = `
@font-face {
    font-family: 'Mont';
    src: url(${montBoldURL}) format('opentype');
    font-weight: 300;
}

@font-face {
    font-family: 'Manrope';
    src: url(${manropeURL}) format('truetype');
    font-weight: 100 800;
}

@font-face {
    font-family: 'Helvetica';
    src: url(${helveticaLightURL}) format('truetype');
    font-weight: 300;
}

@font-face {
    font-family: 'Helvetica';
    src: url(${helveticaMediumURL}) format('truetype');
    font-weight: 500;
}
`;

export default fonts;
