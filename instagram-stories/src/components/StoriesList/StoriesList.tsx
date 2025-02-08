import { useMemo } from "react"
import Users, { UserType } from "../../data"
import StoryItem from "./StoryItem"
import "./index.css"

const StoriesList = () => {
  const users = useMemo(() => Users, [])

  return (
    <div className="stories-list-container">
      <StoryItem
        id={0}
        name="Your Story"
        bgImage="images/user.png"
        alt_text="image"
      />
      {users.map((user: UserType) => (
        <StoryItem key={user.id} {...user} />
      ))}
    </div>
  )
}

export default StoriesList
