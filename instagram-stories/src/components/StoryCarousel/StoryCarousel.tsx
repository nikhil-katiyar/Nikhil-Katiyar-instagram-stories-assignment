import { SetStateAction, useCallback, useEffect, useRef, useState } from "react"
import { STORY_DURATION, UserType } from "../../data"
import "./index.css"
import { ViewedType } from "../StoriesList/StoriesList"
import Spinner from "../Spinner"

const StoryCarousel = ({
  selectedStory,
  setSelectedStory,
  users,
  setViewed,
  loading,
}: {
  selectedStory: UserType | null
  setSelectedStory: React.Dispatch<SetStateAction<UserType | null>>
  users: UserType[]
  setViewed: React.Dispatch<SetStateAction<ViewedType>>
  loading: boolean
}) => {
  const [currentImage, setCurrentImage] = useState(0)
  const touchStart = useRef(0)
  const touchEnd = useRef(0)
  const { stories, id, name } = selectedStory || {}
  const intervalId = useRef<number>(undefined)
  const progress = useRef(0)

  const handleClickChange = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX } = e
    const halfWidth = screen.availWidth / 2
    const el = document.getElementsByClassName(
      "progress",
    ) as HTMLCollectionOf<HTMLElement>
    if (clientX <= halfWidth) {
      el[currentImage].style.width = `0%`
      setCurrentImage(currentImage - 1)
    } else {
      el[currentImage].style.width = `100%`
      if (stories?.length) {
        setCurrentImage(currentImage + 1)
      }
    }
  }

  const handleProgressBar = useCallback(
    (currentId: number) => {
      const interval = STORY_DURATION / 100
      progress.current = 0
      const el = document.getElementsByClassName(
        "progress",
      ) as HTMLCollectionOf<HTMLElement>
      intervalId.current = setInterval(() => {
        progress.current = progress.current + 1
        el[currentId].style.width = `${progress.current}%`
        if (progress.current >= 100) {
          progress.current = 0
          if (stories?.length && currentImage < stories.length) {
            setCurrentImage((prev) => prev + 1)
          }
        }
      }, interval)
    },
    [STORY_DURATION, stories, currentImage],
  )

  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    touchStart.current = e.targetTouches[0].clientY
  }

  function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    touchEnd.current = e.targetTouches[0].clientY
  }

  function handleTouchEnd() {
    if (touchEnd.current && touchEnd.current - touchStart.current > 150) {
      // bottom swipe gesture
      clearInterval(intervalId.current)
      setSelectedStory(null)
    }
  }

  const moveToNextStory = () => {
    if (id && users[id]) {
      setViewed((prev) => ({
        ...prev,
        [id + 1]: true,
      }))
      setSelectedStory(users[id])
    } else {
      setSelectedStory(null)
    }
  }

  const moveToPrevStory = () => {
    // This is -2 because our id in users data and index we are at, differ by 1, so to go to one index back, we need to substract 2 from id
    if (id && users[id - 2]) {
      setViewed((prev) => ({
        ...prev,
        [id - 1]: true,
      }))
      setSelectedStory(users[id - 1])
    } else {
      setSelectedStory(null)
    }
  }

  useEffect(() => {
    if (!loading) {
      if (stories?.length && currentImage < stories.length) {
        clearInterval(intervalId.current)
        if (currentImage < 0) {
          moveToPrevStory()
        } else {
          handleProgressBar(currentImage)
        }
      } else {
        setCurrentImage(0)
        clearInterval(intervalId.current)
        moveToNextStory()
      }
    }
  }, [currentImage, loading])

  return (
    <div
      className="container"
      onClick={handleClickChange}
      onTouchStart={(touchStartEvent) => handleTouchStart(touchStartEvent)}
      onTouchMove={(touchMoveEvent) => handleTouchMove(touchMoveEvent)}
      onTouchEnd={() => handleTouchEnd()}
    >
      <div className="story-bar-container">
        {stories?.map((story: string) => (
          <div
            className="story-bar"
            key={story}
            style={{ width: `calc((100%/${stories.length}) - 1%)` }}
          >
            <div className="progress" />
          </div>
        ))}
      </div>
      <span className="active-name">{name}</span>
      {loading ? (
        <Spinner />
      ) : (
        <div className="stories">
          {stories?.map((storyImg: string, index: number) => {
            return (
              <div
                className={`image ${index === currentImage ? "active" : ""}`}
                key={storyImg}
              >
                {index === currentImage && (
                  <img src={storyImg} alt="image" width="100%" height="100%" />
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default StoryCarousel
