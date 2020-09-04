/* eslint-disable no-undef */
const fs = require('fs');
const fetch = require('node-fetch');
const util = require('util');
const chalk = require('chalk');
const vueLowCode = require('vue-low-code')

console.debug(`\n\n`)
console.debug(`___ _                     _                    ___         _     `)
console.debug(`| __(_)__ _ _ __  __ _ ___| |   _____ __ _____ / __|___  __| |___ `)
console.debug("| _|| / _` | '  \\/ _` |___| |__/ _ \\ V  V /___| (__/ _ \\/ _` / -_)")
console.debug("|_| |_\\__, |_|_|_\\__,_|   |____\\___/\\_/\\_/     \\___\\___/\\__,_\\___|")
console.debug("      |___/                                             ")
console.debug(`\n\n`)

/**
 * Change here the destimation folder. If you change the image folder
 * make sure to also update the conf object.
 */
const jsonFileTarget = 'src/views/app.json'
const fileFolderTarget = 'public/img'

/**
 * Get arguments from path
 */
const figmaAccessKey = process.argv[2]
const figmaFileId = process.argv[3]


/**
 * Check if inout is ok
 */
if (!figmaAccessKey || !figmaFileId) {
  console.debug(chalk.red('Plesse add the figma access token and file id'))
  console.debug('Example: node download.js <accessToken> <fileKey>')
  return
}

/**
 * Enable fetch polyfill
 */
if (!globalThis.fetch) {
  globalThis.fetch = fetch;
  globalThis.Headers = fetch.Headers
}

/**
 * Start downloading
 */
const streamPipeline = util.promisify(require('stream').pipeline);
vueLowCode.setLogLevel(-5)
const figmaService = new vueLowCode.createFigmaService(figmaAccessKey)
console.debug(chalk.blue('Download Figma file...'))
figmaService.get(figmaFileId, true).then(async app => {
  console.debug(chalk.blue('Download images:'))

  const widgetsWithImages = Object.values(app.widgets).filter(w => {
    return w.props.figmaImage
  })
  var promisses = widgetsWithImages.map(async w => {
    const imageURL = w.props.figmaImage
    var imageFileTarget = fileFolderTarget + '/' + w.id +'.png'
    console.debug(chalk.blueBright('  - ' + imageFileTarget))
    const response = await fetch(imageURL);
    if (response.ok) {
      w.style.backgroundImage = {
        url: w.id +'.png'
      }
      return streamPipeline(response.body, fs.createWriteStream(imageFileTarget));
    }
  })
  await Promise.all(promisses)


  console.debug(chalk.blue('Write app file...'))
  var content = JSON.stringify(app, null, 2)
  fs.writeFileSync(jsonFileTarget, content)

  console.debug(`\n\n`)
  console.debug(chalk.green('Done!'), 'Now import the JSON file in', chalk.green('Home.vue'))
})
