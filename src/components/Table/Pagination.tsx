import React from "react"
import classnames from "classnames"

interface PaginationProps {
	pageIndex: number
	links: number[]
	pageCount: number
	gotoPage: (index: number) => void
	previousPage: () => void
	nextPage: () => void
	hasMoreNextPage: boolean
	hasMorePrevPage: boolean
	disableNext: boolean
	disablePrevious: boolean
}

interface PageItemProps {
	active?: boolean
	disabled?: boolean
	onClick?(): void
}

const PageItem: React.FC<PageItemProps> = ({ children, active, disabled, onClick }) => {
	return (
		<li className="page-item">
			<button className={classnames("page-link", { active, disabled })} onClick={() => onClick && onClick()}>
				{children}
			</button>
		</li>
	)
}

export const Pagination: React.FC<PaginationProps> = ({
	pageIndex,
	links,
	pageCount,
	gotoPage,
	previousPage,
	nextPage,
	hasMoreNextPage,
	hasMorePrevPage,
	disableNext,
	disablePrevious,
}) => {
	return (
		<ul className="flex mb-3 md:mb-0">
			<PageItem disabled={disablePrevious} onClick={() => gotoPage(0)}>
				&laquo;
			</PageItem>
			<PageItem disabled={disablePrevious} onClick={() => previousPage()}>
				&lsaquo;
			</PageItem>
			{hasMorePrevPage && (
				<PageItem onClick={() => gotoPage(links[0] - 1)}>
					<span>...</span>
				</PageItem>
			)}
			{links.map(v => (
				<PageItem key={v} active={v === pageIndex} onClick={() => gotoPage(v)}>
					{v + 1}
				</PageItem>
			))}
			{hasMoreNextPage && (
				<PageItem onClick={() => gotoPage(links[links.length - 1] + 1)}>
					<span>...</span>
				</PageItem>
			)}
			<PageItem disabled={disableNext} onClick={() => nextPage()}>
				&rsaquo;
			</PageItem>
			<PageItem disabled={disableNext} onClick={() => gotoPage(pageCount - 1)}>
				&raquo;
			</PageItem>
		</ul>
	)
}
