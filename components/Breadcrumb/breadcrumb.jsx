"use client";
import React from 'react';
import { usePathname } from 'next/navigation'
import Link from 'next/link';


const NextBreadcrumb = ({capitalizeLinks}) => {

    const paths = usePathname()
    const pathNames = paths.split('/').filter( path => path )

    return (
        <nav>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link href={'/'}><i className="bi bi-house-door"></i></Link></li>
            {
                pathNames.map( (link, index) => {
                    let href = `/${pathNames.slice(0, index + 1).join('/')}`
                    let itemClasses = paths === href ? 'breadcrumb-item active' :" breadcrumb-item"
                    let itemLink = capitalizeLinks ? link[0].toUpperCase() + link.slice(1, link.length) : link
                    return (
                        <React.Fragment key={index}>
                            <li className={itemClasses} >
                                <Link href={href}>{itemLink}</Link>
                            </li>
                            {/* {pathNames.length !== index + 1 && separator} */}
                        </React.Fragment>
                    )
                })
            }
            </ol>
        </nav>
    )
}

export default NextBreadcrumb

// usage Example
// import NextBreadcrumb from "../components/Breadcrumb/breadcrumb"
{/* <NextBreadcrumb
    homeElement={'Home'}
    separator={<span> / </span>}
    activeClasses='text-amber-500'
    containerClasses='flex py-5' 
    listClasses='hover:underline mx-2 font-bold'
    capitalizeLinks
    /> */}
