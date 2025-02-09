import { SetStateAction } from "react"
import { UserType } from "../../data"

const Storyitem = (props: {
  user: UserType
  setSelectedStory: React.Dispatch<SetStateAction<object>>
  loading: boolean
}) => {
  const {
    user: { bgImage, name },
    setSelectedStory,
    loading,
  } = props
  return (
    <div
      className="storyitem-container"
      onClick={(e) => {
        e.stopPropagation()
        console.log(props)
        setSelectedStory(props.user)
      }}
    >
      <div className={`outer-circle ${loading ? "loading" : ""}`}>
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
