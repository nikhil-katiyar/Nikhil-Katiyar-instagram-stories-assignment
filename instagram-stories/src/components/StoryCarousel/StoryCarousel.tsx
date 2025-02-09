import { SetStateAction, useCallback, useEffect, useRef, useState } from "react"
import { STORY_DURATION, UserType } from "../../data"
import "./index.css"

const StoryCarousel = ({
  selectedStory,
  setSelectedStory,
}: {
  selectedStory: UserType | object
  setSelectedStory: React.Dispatch<SetStateAction<UserType | object>>
}) => {
  const [current, setCurrent] = useState(0)
  // const [touchStart, setTouchStart] = useState(0)
  // const [touchEnd, setTouchEnd] = useState(0)
  const touchStart = useRef(0)
  const touchEnd = useRef(0)
  const { stories } = selectedStory
  const intervalId = useRef<number>(null)
  const progress = useRef(0)

  const handleClickChange = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX } = e
    const halfWidth = screen.availWidth / 2

    const el = document.getElementsByClassName("progress")
    if (clientX <= halfWidth) {
      el[current].style.width = `0%`
      setCurrent(current - 1 >= 0 ? current - 1 : 0)
    } else {
      el[current].style.width = `100%`
      setCurrent(
        current + 1 < stories.length ? current + 1 : stories.length - 1
      )
    }
  }

  const handleProgressBar = useCallback(
    (currentId: number) => {
      const interval = STORY_DURATION / 100
      progress.current = 0
      const el = document.getElementsByClassName("progress")
      intervalId.current = setInterval(() => {
        progress.current = progress.current + 1
        el[currentId].style.width = `${progress.current}%`
        if (progress.current >= 100) {
          progress.current = 0
          if (current < stories.length) {
            setCurrent((prev) => prev + 1)
          }
        }
      }, interval)
    },
    [STORY_DURATION, stories]
  )

  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    touchStart.current = e.targetTouches[0].clientY
  }

  function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    touchEnd.current = e.targetTouches[0].clientY
  }

  function handleTouchEnd() {
    console.log(touchStart, touchEnd)
    if (touchEnd.current && touchEnd.current - touchStart.current > 150) {
      // bottom swipe gesture
      clearInterval(intervalId.current)
      setSelectedStory({})
    }
  }

  useEffect(() => {
    if (current < stories.length) {
      clearInterval(intervalId.current)
      handleProgressBar(current)
    } else {
      setCurrent(0)
      clearInterval(intervalId.current)
      //Move to next
    }
  }, [current])

  return (
    <div
      className="container"
      onClick={handleClickChange}
      onTouchStart={(touchStartEvent) => handleTouchStart(touchStartEvent)}
      onTouchMove={(touchMoveEvent) => handleTouchMove(touchMoveEvent)}
      onTouchEnd={() => handleTouchEnd()}
    >
      <div className="story-bar-container">
        {stories.map((story: string) => (
          <div
            className="story-bar"
            key={story}
            style={{ width: `calc((100%/${stories.length}) - 1%)` }}
          >
            <div className="progress" />
          </div>
        ))}
      </div>
      <div className="stories">
        {stories?.map((storyImg: string, index: number) => {
          return (
            <div
              className={`image ${index === current ? "active" : ""}`}
              key={storyImg}
            >
              {index === current && (
                <img src={storyImg} alt="image" width="100%" height="100%" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StoryCarousel
