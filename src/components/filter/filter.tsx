import { Fragment } from 'react'

import { useBooleanState } from '../../hooks/use-boolean-state'
import { DataTestId, Size, TypeSortMainPage } from '../../types/other'
import { CustomSelect } from '../ui/custom-select'
import { RoundButton } from '../ui/round-button'
import { SearchInput } from '../ui/search-input'

import { ReactComponent as ListImg } from './assets/burger.svg'
import { ReactComponent as Search } from './assets/search.svg'
import { ReactComponent as Sort } from './assets/sort.svg'
import { ReactComponent as TileImg } from './assets/tile.svg'

import styles from './filter.module.scss'

type FilterProps = {
  changeSorting: (type: TypeSortMainPage) => void
  selectSorting: TypeSortMainPage
  inputText: string
  changeInputText: (value: string) => void
}

export const Filter = ({
  changeSorting,
  selectSorting,
  inputText,
  changeInputText,
}: FilterProps) => {
  const { state: isShowOnlySearchInput, setFalse, setTrue } = useBooleanState()

  return (
    <div className={styles.filter}>
      {isShowOnlySearchInput ? (
        <SearchInput
          inputText={inputText}
          changeInputText={changeInputText}
          placeholder='Поиск книги или автора...'
          size={Size.small}
          closeHandler={setFalse}
          autofocus={true}
        />
      ) : (
        <Fragment>
          <div className={styles.sorting}>
            <div className={styles.blockDesktop}>
              <SearchInput
                inputText={inputText}
                changeInputText={changeInputText}
                placeholder='Поиск книги или автора...'
                size={Size.medium}
              />
              <CustomSelect placeholder='По рейтингу' />
            </div>
            <div className={styles.blockMobile}>
              <RoundButton handler={setTrue} dataTestId={DataTestId['button-search-open']}>
                <Search />
              </RoundButton>
              <RoundButton>
                <Sort />
              </RoundButton>
            </div>
          </div>
          <div className={styles.listType}>
            <RoundButton
              changeSorting={changeSorting}
              selectSorting={selectSorting}
              sortingType={TypeSortMainPage.tile}
              dataTestId={DataTestId['button-menu-view-window']}
            >
              <TileImg />
            </RoundButton>
            <RoundButton
              changeSorting={changeSorting}
              selectSorting={selectSorting}
              sortingType={TypeSortMainPage.list}
              dataTestId={DataTestId['button-menu-view-list']}
            >
              <ListImg />
            </RoundButton>
          </div>
        </Fragment>
      )}
    </div>
  )
}
