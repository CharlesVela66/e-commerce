import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Order } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
import { HR } from '../../../_components/HR'
import { RenderParams } from '../../../_components/RenderParams'
import { formatDateTime } from '../../../_utilities/formatDateTime'
import { getMeUser } from '../../../_utilities/getMeUser'

import classes from './index.module.scss'

const Orders = async () => {
  const { token } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'You must be logged in to view your orders.',
    )}&redirect=${encodeURIComponent('/orders')}`,
  })

  let orders: Order[] | null = null

  try {
    orders = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      cache: 'no-store',
    })
      ?.then(async res => {
        if (!res.ok) notFound()
        const json = await res.json()
        if ('error' in json && json.error) notFound()
        if ('errors' in json && json.errors) notFound()
        return json
      })
      ?.then(json => json.docs)
  } catch (error) {
    console.error(error)
  }
  return (
    <div className={classes.container}>
      <h5>My Orders</h5>
      {(!orders || !Array.isArray(orders) || orders?.length === 0) && (
        <p className={classes.noOrders}>You have no orders.</p>
      )}
      <RenderParams />
      {orders && orders.length > 0 && (
        <ul className={classes.orders}>
          {orders?.map((order, index) => (
            <li key={order.id} className={classes.order}>
              <Link className={classes.item} href={`/orders/${order.id}`}>
                <div className={classes.itemContent}>
                  <h6>{`Order ${order.id}`}</h6>
                  <div className={classes.itemMeta}>
                    <p>
                      {'Total: '}
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'usd',
                      }).format(order.total / 100)}
                    </p>
                    <p className={classes.orderedDate}>{`Ordered On: ${formatDateTime(
                      order.createdAt,
                    )}`}</p>
                  </div>
                </div>
                <Button
                  appearance="default"
                  label="View Order"
                  className={classes.button}
                  el="button"
                />
              </Link>
              {index !== orders.length - 1 && <HR />}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Orders
