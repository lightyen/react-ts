import "twin.macro"
import __styled from "@emotion/styled"
import { css as __css } from "@emotion/react"

declare module "twin.macro" {
	const css: typeof __css
	const styled: typeof __styled
}
