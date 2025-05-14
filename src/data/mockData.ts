
import { Media } from "../types/media";
import { v4 as uuidv4 } from "uuid";

export const mockMediaData: Media[] = [
  {
    id: uuidv4(),
    title: "Demon Slayer",
    type: "anime",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    summary: "Tanjiro Kamado's peaceful life is shattered when his family is slaughtered by a demon. His sister Nezuko is the sole survivor, but she has been transformed into a demon herself. Tanjiro sets out to become a demon slayer to avenge his family and cure his sister.",
    rating: 9,
    notes: "Amazing animation and fight scenes",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-01-15")
  },
  {
    id: uuidv4(),
    title: "Attack on Titan",
    type: "anime",
    imageUrl: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
    summary: "In a world where humanity lives inside cities surrounded by enormous walls due to the Titans, gigantic humanoid creatures who devour humans seemingly without reason, a young boy named Eren Yeager dreams of going outside the walls to see the 'world outside'.",
    rating: 10,
    notes: "Plot twists are incredible",
    createdAt: new Date("2023-02-10"),
    updatedAt: new Date("2023-02-10")
  },
  {
    id: uuidv4(),
    title: "Inception",
    type: "movie",
    imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    summary: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    rating: 9,
    notes: "Mind-bending concept, need to rewatch",
    createdAt: new Date("2022-12-05"),
    updatedAt: new Date("2022-12-05")
  },
  {
    id: uuidv4(),
    title: "Breaking Bad",
    type: "series",
    imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    summary: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
    rating: 10,
    notes: "Best character development ever",
    createdAt: new Date("2023-03-20"),
    updatedAt: new Date("2023-03-20")
  },
  {
    id: uuidv4(),
    title: "Jujutsu Kaisen",
    type: "anime",
    imageUrl: "https://images.unsplash.com/photo-1518877593221-1f28583780b4",
    summary: "A boy swallows a cursed talisman - the finger of a demon - and becomes cursed himself. He enters a shaman school to be able to locate the demon's other body parts and thus exorcise himself.",
    rating: 8,
    notes: "Great animation and fight choreography",
    createdAt: new Date("2023-04-05"),
    updatedAt: new Date("2023-04-05")
  }
];
