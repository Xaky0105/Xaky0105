import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Breadcrumbs } from '@/components/breadcrumbs'
import { Container } from '@/components/container'
import { ReviewsList } from '@/components/reviews-list'
import { Toast } from '@/components/ui/toast'

import { selectBookDetailed, selectErrorBook } from '@/store/book/book.selector'
import { clearBook, getBookFailure, getBookFetch } from '@/store/book/book.slice'

import { useAppDispatch, useAppSelector } from '@/hooks/use-redux'

import { DetailedInformation } from './detailed-information'
import { MainInfo } from './main-info'
import { RatingBlock } from './rating-block'

import styles from './book-page.module.scss'

type BookParams = {
  bookId: string
}

export const BookPage = () => {
  const { bookId } = useParams<keyof BookParams>() as BookParams

  const dispatch = useAppDispatch()

  const bookDetailed = useAppSelector(selectBookDetailed)
  const bookError = useAppSelector(selectErrorBook)

  useEffect(() => {
    dispatch(getBookFetch(+bookId))

    return () => {
      dispatch(clearBook())
    }
  }, [dispatch, bookId])

  return (
    <section className={styles.bookPage}>
      <div className={styles.breadcrumbsWrap}>
        <Container>
          <Breadcrumbs />
        </Container>
      </div>
      {bookDetailed.id && (
        <Container>
          <MainInfo book={bookDetailed} />
          <RatingBlock rating={bookDetailed.rating} />
          <DetailedInformation book={bookDetailed} />
          <ReviewsList reviews={bookDetailed.comments} />
        </Container>
      )}

      {bookError && (
        <Toast type='negative' onClose={() => dispatch(getBookFailure(''))} message={bookError} />
      )}
    </section>
  )
}
