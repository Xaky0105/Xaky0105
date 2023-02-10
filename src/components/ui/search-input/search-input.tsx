import { FC, useEffect, useRef } from 'react'
import clsx from 'clsx'

import { useBooleanState } from '@/hooks/use-boolean-state'

import { ReactComponent as CloseIcon } from '@/assets/images/action/close.svg'
import { ReactComponent as SearchIcon } from '@/assets/images/action/search.svg'

import styles from './search-input.module.scss'

interface ISearchInput {
  placeholder: string
  size?: 'normal' | 'small'
  inputText: string
  changeInputText: (value: string) => void
  closeHandler?: () => void
  autofocus?: boolean
}

export const SearchInput: FC<ISearchInput> = ({
  placeholder,
  size = 'normal',
  inputText,
  changeInputText,
  closeHandler,
  autofocus = false,
}) => {
  const { state: isFocus, setTrue, setFalse } = useBooleanState()
  const inputElement = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!autofocus) {
      return
    }

    if (inputElement.current) {
      inputElement.current.focus()
    }
  }, [autofocus])

  return (
    <div
      className={clsx(styles.inputWrap, size === 'small' && styles.small)}
      data-test-id='input-search'
    >
      {size === 'normal' && (
        <SearchIcon className={clsx(styles.searchIcon, isFocus && styles.searchIconColor)} />
      )}
      <input
        type='text'
        className={clsx(
          styles.searchInput,
          size === 'normal' && styles.normal,
          size === 'small' && styles.small
        )}
        placeholder={placeholder}
        onBlur={setFalse}
        onFocus={setTrue}
        onChange={e => changeInputText(e.target.value)}
        value={inputText}
        ref={inputElement}
      />
      <CloseIcon
        className={clsx(styles.closeIcon, isFocus && styles.closeIconColor)}
        onClick={closeHandler}
        data-test-id='button-search-close'
      />
    </div>
  )
}
