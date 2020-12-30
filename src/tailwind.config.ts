import { TailwindcssConfig } from "./typings/tailwind"

import userConfig from "../tailwind.config.js"
import resolveConfig from "tailwindcss/resolveConfig"
export default resolveConfig(userConfig) as TailwindcssConfig
