import serialize from "serialize-javascript"
import { readFileSync } from "fs"
import { ABSOLUTE_ASSETSINFO_PATH, ABSOLUTE_CHUNKMANIFEST_PATH } from "./config"

var chunkManifest = "{}"
if (process.env.MODE === "production")
{
  try {
    chunkManifest = readFileSync(ABSOLUTE_CHUNKMANIFEST_PATH, "utf-8")
  } catch (error) {
    console.warn("Could not parse chunkhashes from manifest.json: ", error)
  }
}

const clientAssets = JSON.parse(
  readFileSync(ABSOLUTE_ASSETSINFO_PATH, "utf-8")
)

// Convert the assets json it into an object that contains all the paths to our
// javascript and css files. Doing this is required as for production
// configurations we add a hash to our filenames, therefore we won't know the
// paths of the output by webpack unless we read them from the assets.json file.
// const chunks = Object.keys(clientAssets).map((key) => clientAssets[key])

function getAssetsForClientChunks(chunks) {
  return chunks.reduce((result, chunkName) => {
    const chunkAssets = clientAssets[chunkName]
    if (chunkAssets) {
      if (chunkAssets.js) {
        result.scripts.push(chunkAssets.js)
      }
      if (chunkAssets.css) {
        result.styles.push(chunkAssets.css)
      }
    }
    return result
  }, { scripts: [], styles: [] })
}

/**
 * Generates HTML link stylesheet tags from a list of stylesheet URLs.
 */
function generateLinkStyleTags(styles) {
  return styles
    .map((uri) =>
      `<link href="${uri}" media="screen, projection" rel="stylesheet" />`
    )
    .join("\n")
}

/**
 * Generates HTML script tags from a list of script URLs.
 */
function generateScriptTags(scripts) {
  return scripts
    .map((uri) =>
      `<script src="${uri}"></script>`
    )
    .join("\n")
}

/**
 * Generates a full HTML page containing the render output of the given react
 * element.
 *
 * @param  rootReactElement
 *   [Optional] The root React element to be rendered on the page.
 * @param  initialState
 *   [Optional] The initial state for the redux store which will be used by the
 *   client to mount the redux store into the desired state.
 *
 * @return The full HTML page in the form of a React element.
 */
export default function renderPage({ renderedApp, initialState = {},
  nonce, helmet, codeSplitState, STATE_IDENTIFIER, language, region, messages={} }) {
  // The chunks that we need to fetch the assets (js/css) for and then include
  // said assets as script/style tags within our html.
  const chunksForRender = [
    // We always manually add the main entry chunk for our client bundle. It
    // must always be the first item in the collection.
    "vendor",
    "main"
  ]

  /*
  if (codeSplitState && codeSplitState.chunks) {
    // We add all the chunks that our CodeSplitProvider tracked as being used
    // for this render. This isn't actually required as the rehydrate function
    // of code-split-component which gets executed in our client bundle will
    // ensure all our required chunks are loaded, but its a nice optimisation as
    // it means the browser can start fetching the required files before it's
    // even finished parsing our client bundle entry script.
    // Having the assets.json file available to us made implementing this
    // feature rather arbitrary.
    codeSplitState.chunks.forEach((chunk) => chunksForRender.push(chunk))
  }
  */

  // Now we get the assets (js/css) for the chunks.
  const assetsForRender = getAssetsForClientChunks(chunksForRender)

  /* eslint-disable prefer-template */

  let inlineCode = `APP_STATE=${serialize(initialState, { isJSON: true })};`
  inlineCode += `CHUNK_MANIFEST=${chunkManifest};`
  if (STATE_IDENTIFIER) {
    inlineCode += `${STATE_IDENTIFIER}=${serialize(codeSplitState, { isJSON: true })};`
  }
  inlineCode += `MESSAGES=${messages};`

  const langValue = region ? `${language}-${region}` : language

  return `<!doctype html>
    <html lang="${langValue}" ${helmet ? helmet.htmlAttributes.toString() : ""}>
      <head>
        ${helmet ? helmet.title.toString() : ""}
        ${helmet ? helmet.meta.toString() : ""}
        ${helmet ? helmet.link.toString() : ""}

        ${generateLinkStyleTags(assetsForRender.styles)}
        ${helmet ? helmet.style.toString() : ""}
      </head>
      <body>
        <div id="app">${renderedApp || ""}</div>

        <script nonce="${nonce}">${inlineCode}</script>

        ${generateScriptTags(assetsForRender.scripts)}
        ${helmet ? helmet.script.toString() : ""}
      </body>
    </html>`
}
