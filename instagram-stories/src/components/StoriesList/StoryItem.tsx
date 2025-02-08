import { Link } from "react-router-dom"
import { UserType } from "../../data"

const Storyitem = ({ id, name, bgImage }: UserType) => {
  return (
    <div className="storyitem-container">
      <div className="outer-circle">
        <Link to={`/story/${id}`}>
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
        </Link>
      </div>

      <div className="name">{name}</div>
    </div>
  )
}

export default Storyitem
