import React, {FC} from 'react';
import styles from './Paginator.module.css';

type PaginatorPropsType = {
    pageSize: number,
    totalUsersCount: number,
    currentPage: number
    onPageChanged:(pageNumber:number) => void
}


export const Paginator:FC<PaginatorPropsType> = ({onPageChanged, pageSize, currentPage, totalUsersCount, children}) => {
    let pagesCount =Math.ceil(totalUsersCount/pageSize)

    let pages = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }



    return (
            <div>
                {pages.map(p => {
                    return  <span className={currentPage === p ? styles.selectedPage : ''} onClick={(e) => {onPageChanged(p)}}>{p}</span>
                })}
            </div>
    )
}