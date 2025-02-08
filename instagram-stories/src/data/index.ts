export default [
  {
    id: 1,
    name: "Nikhil",
    bgImage: "icons/1.jpg",
    stories: ["images/1.png", "images/2.png"],
    alt_text: "Nikhil",
  },
  {
    id: 2,
    name: "Aisha",
    bgImage: "icons/2.jpg",
    stories: ["images/3.png", "images/4.png", " images/7.png", "images/2.png"],
    alt_text: "Aisha",
  },
  {
    id: 3,
    name: "Rohan",
    bgImage: "icons/3.jpg",
    stories: ["images/1.png"],
    alt_text: "Rohan",
  },
  {
    id: 4,
    name: "Mia",
    bgImage: "icons/4.jpg",
    stories: ["images/8.png", "images/5.png"],
    alt_text: "Mia",
  },
  {
    id: 5,
    name: "Daniel",
    bgImage: "icons/5.jpg",
    stories: ["images/6.png"],
    alt_text: "Daniel",
  },
  {
    id: 6,
    name: "Sophia",
    bgImage: "icons/6.jpg",
    stories: ["images/10.png"],
    alt_text: "Sophia",
  },
  {
    id: 7,
    name: "Liam",
    bgImage: "icons/7.jpg",
    stories: ["images/10.png"],
    alt_text: "Liam",
  },
  {
    id: 8,
    name: "Emma",
    bgImage: "icons/8.jpg",
    stories: ["images/10.png"],
    alt_text: "Emma",
  },
  {
    id: 9,
    name: "Arjun",
    bgImage: "icons/9.jpg",
    stories: ["images/10.png"],
    alt_text: "Arjun",
  },
  {
    id: 10,
    name: "Olivia",
    bgImage: "icons/10.jpg",
    stories: ["images/10.png"],
    alt_text: "Olivia",
  },
]

export interface UserType {
  id: number
  name: string
  bgImage: string
  alt_text: string
}
