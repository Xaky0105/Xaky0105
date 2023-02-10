import { FC } from 'react'

import sort from '@/assets/images/action/sort.svg'

import styles from './custom-input.module.scss'

interface ICustomSelect {
  placeholder: string
}

export const CustomSelect: FC<ICustomSelect> = ({ placeholder }) => (
  <button type='button' className={styles.select}>
    <div className={styles.imgWrap}>
      <img src={sort} alt={placeholder} />
    </div>
    {placeholder}
  </button>
)
