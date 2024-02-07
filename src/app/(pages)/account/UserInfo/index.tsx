'use client'

import React from 'react'
import Image from 'next/image'

import { useAuth } from '../../../_providers/Auth'

import classes from './index.module.scss'

const UserInfo = () => {
  const { user } = useAuth()

  return (
    <div className={classes.container}>
      <Image src="/assets/icons/profile.svg" alt="user" width={48} height={48} />
      <div className={classes.userInfo}>
        <h5>{user?.name}</h5>
        <p>{user?.email}</p>
      </div>
    </div>
  )
}

export default UserInfo
