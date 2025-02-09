import { useMemo, useState, useEffect } from "react"
import Users, { UserType } from "../../data"
import StoryItem from "./StoryItem"
import "./index.css"
import StoryCarousel from "../StoryCarousel/StoryCarousel"

export type ViewedType =
  | {
      [key: string]: boolean
    }
  | Record<string, never>

// Helper function to preload a single image
const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => reject()
    img.src = src
  })
}

const StoriesList = () => {
  const users = useMemo(() => Users, [])
  const [viewed, setViewed] = useState<ViewedType>({})
  const [selectedStory, setSelectedStory] = useState<UserType | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Preload all story images when component mounts
  useEffect(() => {
    const preloadAllStories = async () => {
      try {
        // Get all unique story image URLs
        const allStoryImages = users.reduce((acc: string[], user) => {
          if (user.stories) {
            return [...acc, ...user.stories]
          }
          return acc
        }, [])

        // Preload all images in parallel
        await Promise.all(allStoryImages.map((src) => preloadImage(src)))

        setIsLoading(false)
      } catch (error) {
        console.error("Error preloading stories:", error)
        setIsLoading(false)
      }
    }

    preloadAllStories()
  }, [users])

  return (
    <>
      {Object.keys(selectedStory || {}).length === 0 ? (
        <div style={{ padding: "0 8px" }}>
          <h1>Instagram</h1>
          <div className="stories-list-container">
            <StoryItem
              user={{
                id: 0,
                name: "Your Story",
                bgImage: "images/user.png",
                alt_text: "image",
                stories: [],
              }}
              setSelectedStory={setSelectedStory}
              viewed={viewed}
              setViewed={setViewed}
            />
            {users.map((user: UserType) => (
              <StoryItem
                key={user.id}
                user={user}
                setSelectedStory={setSelectedStory}
                viewed={viewed}
                setViewed={setViewed}
              />
            ))}
          </div>
        </div>
      ) : (
        <StoryCarousel
          selectedStory={selectedStory || null}
          setSelectedStory={setSelectedStory}
          users={users}
          setViewed={setViewed}
          loading={isLoading}
        />
      )}
    </>
  )
}

export default StoriesList
