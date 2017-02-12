// Contains all the configuration specific to our Server.
// Please note that the DefinePlugin of webpack will inline/replace all the
// respective "process.env.*" variables below with the actual values.
// These config values then become a part of the server bundle.

import { resolve, dirname } from "path"

export const APP_ROOT = resolve(
  dirname(process.mainModule.filename),
  process.env.APP_ROOT
)

export const ABSOLUTE_CLIENT_OUTPUT_PATH = resolve(
  APP_ROOT,
  process.env.CLIENT_BUNDLE_OUTPUT_PATH
)

export const ABSOLUTE_ASSETSINFO_PATH = resolve(
  APP_ROOT,
  process.env.CLIENT_BUNDLE_OUTPUT_PATH,
  process.env.CLIENT_BUNDLE_ASSETS_FILENAME
)

export const ABSOLUTE_CHUNKMANIFEST_PATH = resolve(
  APP_ROOT,
  process.env.CLIENT_BUNDLE_OUTPUT_PATH,
  process.env.CLIENT_BUNDLE_CHUNK_MANIFEST_FILENAME
)

export const ABSOLUTE_PUBLIC_PATH = resolve(
  APP_ROOT,
  process.env.CLIENT_PUBLIC_PATH
)
