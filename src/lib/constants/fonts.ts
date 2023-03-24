// Importing fonts using chrome.runtime.getURL
// __MSG@@extension_id is not working 😩😩

const montRegularUrl = chrome.runtime.getURL(`fonts/Mont-Regular.otf`);
const montSemiBoldUrl = chrome.runtime.getURL('fonts/Mont-SemiBold.otf');
const montBoldUrl = chrome.runtime.getURL('fonts/Mont-Bold.otf');

const manropeUrl = chrome.runtime.getURL('fonts/Manrope.ttf');

const helveticaLightUrl = chrome.runtime.getURL(
  'fonts/HelveticaNeue-Light.ttf'
);
const helveticaRegularUrl = chrome.runtime.getURL(
  'fonts/HelveticaNeue-Medium.ttf'
);

const fonts = `
@font-face {
  font-family: 'Mont';
  src: url(${montRegularUrl}) format('opentype');
  font-weight: 600;
}

@font-face {
    font-family: 'Mont';
    src: url(${montSemiBoldUrl}) format('opentype');
    font-weight: 700;
}

@font-face {
  font-family: 'Mont';
  src: url(${montBoldUrl}) format('opentype');
  font-weight: 800;
}

@font-face {
    font-family: 'Manrope';
    src: url(${manropeUrl}) format('truetype');
    font-weight: 100 800;
}

@font-face {
    font-family: 'HelveticaNeue';
    src: url(${helveticaLightUrl}) format('truetype');
    font-weight: 300;
}

@font-face {
    font-family: 'HelveticaNeue';
    src: url(${helveticaRegularUrl}) format('truetype');
    font-weight: 500;
}
`;

export default fonts;
