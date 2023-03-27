import React from 'react'
import '../App.css'
import { useDispatch } from 'react-redux'
import { setPage } from '../slices/place/placeSlice';


export const PaginateLink = ({ page }) => {

    const dispatch = useDispatch();

    return (

        <div className = "div-paginate">

            {page.active ? (

                <>
                    <ul className="pagination">

                        <li className="page-item">

                            <a className="page-link" href="#!">

                                {/* Per eliminar els &quote */}

                                <div dangerouslySetInnerHTML={{ __html: page.label }} />

                            </a>

                        </li>
                    </ul>

                </>

            ) : (

                <>
                    <ul className="pagination">

                        <li className="page-item">

                            {/* Artifici per a obtenir el número de pàgina de la url */}

                            <a onClick={(e) => { if (page.url != null) dispatch(setPage(page.url.split("=")[1])) }} className="page-link" href="#!">

                                <div dangerouslySetInnerHTML={{ __html: page.label }}/>

                            </a>

                        </li>
                    </ul>

                </>

            )
            }</div>

    )

}