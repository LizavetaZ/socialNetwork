import React, {FC, useState} from 'react';
import styles from './Paginator.module.css';
import classNames from "classnames";

type PaginatorPropsType = {
    pageSize: number,
    totalItemsCount: number,
    currentPage: number
    onPageChanged:(pageNumber:number) => void
    portionSize: number
}


export const Paginator:FC<PaginatorPropsType> = ({onPageChanged, pageSize, currentPage, totalItemsCount, portionSize = 10}) => {
    let pagesCount =Math.ceil(totalItemsCount/pageSize)

    let pages = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount/portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize


    return (
            <div className={styles.paginator}>
                { portionNumber> 1 && <button onClick={() => {setPortionNumber(portionNumber-1)}}>PREV</button> }
                {pages
                    .filter(p => p >= leftPortionPageNumber && p<= rightPortionPageNumber)
                    .map(p => {
                    return  <span className={ classNames({ [styles.selectedPage] : currentPage === p }, styles.pageNumber)} key={p} onClick={(e) => {onPageChanged(p)}}>{p}</span>
                })}
                {portionCount > portionNumber && <button onClick={() => {setPortionNumber(portionNumber+1)}}>NEXT</button>}
            </div>
    )
}