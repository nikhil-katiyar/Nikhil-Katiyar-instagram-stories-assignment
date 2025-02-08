import { useParams } from "react-router-dom"

const Story = () => {
  const { id } = useParams()
  console.log(id)
  return (
    <div className="story-container">
      <img src={`public/images/${id}.png`} />
    </div>
  )
}

export default Story
