const fs = require('fs-extra');

const copyFiles = async () => {
  try {
    await fs.copy('./node_modules/pdftronV6/public', './public/webviewer/lib/v6');
    await fs.copy('./node_modules/pdftronV8/public', './public/webviewer/lib/v8');
    console.log('WebViewer files copied over successfully');
  } catch (err) {
    console.error(err);
  }
};

copyFiles();
