import React, { useContext, useEffect, useRef } from 'react'
import style from './Pagination.module.css'
import { Context } from '../../..'
import { observer } from 'mobx-react-lite'
import { gsap } from 'gsap'

const Pagination = observer(() => {
	const refPag = useRef(null)
	const { device } = useContext(Context)
	const pagesCount = Math.ceil(device.totalCount / device.limit)
	const pages = []

	for (let i = 0; i < pagesCount; i++) pages.push(i + 1)

	const next = () => {
		if (device.targetPage < pagesCount) {
			device.setTargetPage(device.targetPage + 1)
		}
	}

	const prev = () => {
		if (device.targetPage > 1) {
			device.setTargetPage(device.targetPage - 1)
		}
	}
	if (pagesCount > 1)
		useEffect(() => {
			const animate = gsap.fromTo(
				refPag.current,
				{ opacity: 0, y: '20px' },
				{ opacity: 1, y: '0px', duration: 1, ease: 'power3.out' }
			)
			return () => animate.kill()
		}, [])

	if (pagesCount > 1)
		return (
			<ul className={style.pagination} ref={refPag}>
				<li className={style.item} onClick={prev}>
					<a className={style.pagination__newer} href='#'>
						PREV
					</a>
				</li>
				{pages.map(page => (
					<li
						className={
							page === device.targetPage
								? `${style.item} ${style.item__active}`
								: `${style.item}`
						}
						key={page}
						onClick={() => device.setTargetPage(page)}
					>
						<a href='#'>{page}</a>
					</li>
				))}
				<li className={style.item} onClick={next}>
					<a className={style.pagination__older} href='#'>
						NEXT
					</a>
				</li>
			</ul>
		)
})

export default Pagination
