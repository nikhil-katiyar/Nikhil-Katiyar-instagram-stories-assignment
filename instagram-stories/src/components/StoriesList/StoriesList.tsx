import { useMemo, useState } from "react"
import Users, { UserType } from "../../data"
import StoryItem from "./StoryItem"
import "./index.css"
import StoryCarousel from "../StoryCarousel/StoryCarousel"
// import Image1 from "../../../public/images/1.jpg"
// import Image2 from "../../../public/images/2.jpg"
// import Image3 from "../../../public/images/3.jpg"
// import Image4 from "../../../public/images/4.jpg"
// import useImagePreloader from "../../hooks"

// const preloadSrcList: string[] = [Image1, Image2, Image3, Image4]
export type ViewedType =
  | {
      [key: string]: boolean
    }
  | Record<string, never>
const StoriesList = () => {
  const users = useMemo(() => Users, [])
  const [viewed, setViewed] = useState<ViewedType>({})
  // const { imagesPreloaded } = useImagePreloader(preloadSrcList)
  // const [loading, setLoading] = useState(false)
  const [selectedStory, setSelectedStory] = useState<UserType | null>(null)
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
              loading={false}
            />
            {users.map((user: UserType) => (
              <StoryItem
                key={user.id}
                user={user}
                setSelectedStory={setSelectedStory}
                loading={false}
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
        />
      )}
    </>
  )
}

export default StoriesList
