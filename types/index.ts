import { ReactNode } from "react"

export type user = {
  email: string,
  first_name: string,
  last_name: string,
}

export type dropdownItem = {
  value: string,
  label: string,
  icon?: string
}

export type track = {
  name: string,
  file_link: string,
  album_name: string,
  thumbnail: string,
  featured_artists: string,
  artist: string,
  genre: string,
}