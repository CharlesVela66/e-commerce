'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Media } from '../../../_components/Media'
import { Price } from '../../../_components/Price'
import { useAuth } from '../../../_providers/Auth'
import { formatDateTime } from '../../../_utilities/formatDateTime'

import classes from './index.module.scss'

const Purchases = () => {
  const { user } = useAuth()

  return (
    <div>
      <h5 className={classes.title}>Purchased Products</h5>
      <div>
        {user?.purchases?.length || 0 > 0 ? (
          <ul className={classes.purchases}>
            {user?.purchases?.map((purchase, index) => {
              return (
                <li key={index} className={classes.purchase}>
                  {typeof purchase === 'string' ? (
                    <p>{purchase}</p>
                  ) : (
                    <Link href={`/products/${purchase.slug}`} className={classes.product}>
                      <div>
                        <Media imgClassName={classes.image} resource={purchase.meta.image} />
                      </div>
                      <div className={classes.productInfo}>
                        <h6>{purchase.title}</h6>
                        <Price product={purchase} />
                        <p className={classes.purchasedDate}>{`Purchased On: ${formatDateTime(
                          purchase.createdAt,
                        )}`}</p>
                      </div>
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        ) : (
          <div className={classes.noPurchases}>You have no purchases.</div>
        )}
      </div>
    </div>
  )
}

export default Purchases
