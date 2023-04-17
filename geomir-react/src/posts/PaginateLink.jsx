import React from 'react'
import { useDispatch } from 'react-redux'
import { setPage } from '../slices/post/postSlice';
export const PaginateLink = ({ page }) => {
    const dispatch = useDispatch();
    return (
        <>
            <li className="page-item">
                {page.active ? (
                    <>
                        <a className="page-link" href="#!">
                            {/* Per eliminar els &quote */}
                            <div dangerouslySetInnerHTML={{ __html: page.label }} />
                        </a>
                    </>
                ) : (
                    <>
                        {/* Artifici per a obtenir el número de pàgina de la url */}
                        <a onClick={(e) => { if (page.url != null) dispatch(setPage(page.url.split("=")[1])) }} className="page-link" href="#!">
                            <div dangerouslySetInnerHTML={{ __html: page.label }}/>
                        </a>
                    </>
                )
                }
            </li>
        </>

    )
}
