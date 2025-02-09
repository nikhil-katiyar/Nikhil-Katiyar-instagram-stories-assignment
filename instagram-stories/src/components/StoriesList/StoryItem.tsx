import { SetStateAction } from "react"
import { UserType } from "../../data"

const Storyitem = (props: {
  user: UserType
  setSelectedStory: React.Dispatch<SetStateAction<object>>
  loading: boolean
  viewed: object
  setViewed: React.Dispatch<SetStateAction<object>>
}) => {
  const {
    user: { bgImage, name, id },
    setSelectedStory,
    loading,
    viewed,
    setViewed,
  } = props

  console.log("cdsjkvnbsdv- > ", viewed, id)

  return (
    <div
      className="storyitem-container"
      onClick={(e) => {
        e.stopPropagation()
        setViewed((prev) => ({
          ...prev,
          [id]: true,
        }))
        setSelectedStory(props.user)
      }}
    >
      <div
        className={`outer-circle ${loading ? "loading" : ""} ${
          viewed[id] ? "viewed" : ""
        }`}
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
