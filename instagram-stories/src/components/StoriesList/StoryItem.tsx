import { SetStateAction } from "react"
import { UserType } from "../../data"
import { ViewedType } from "./StoriesList"

const Storyitem = (props: {
  user: UserType
  setSelectedStory: React.Dispatch<SetStateAction<UserType | null>>
  viewed: ViewedType
  setViewed: React.Dispatch<SetStateAction<ViewedType>>
}) => {
  const {
    user: { bgImage, name, id, stories },
    setSelectedStory,
    viewed,
    setViewed,
  } = props

  return (
    <div
      className="storyitem-container"
      onClick={(e) => {
        e.stopPropagation()
        if (stories?.length) {
          setViewed((prev) => ({
            ...prev,
            [id]: true,
          }))
          setSelectedStory(props.user)
        }
      }}
    >
      <div
        className={`outer-circle ${stories?.length ? "" : "border-none"} ${viewed[id.toString()] ? "viewed" : ""}`}
      >
        <div
          className="inner-circle"
          style={
            bgImage
              ? {
                  backgroundImage: `url(${bgImage})`,
                }
              : {}
          }
        ></div>
      </div>

      <div className="name">{name}</div>
    </div>
  )
}

export default Storyitem
