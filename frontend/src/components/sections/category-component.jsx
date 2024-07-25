"use client"

import CategoryList from "./category-list.jsx"

export default function ParentComponent() {
  const initialCategories = [
    {
      id: 1,
      name: "Breakfast",
      description: "Breakfast items and dishes",
      image: "/placeholder.svg",
      mealPeriods: ["Breakfast"],
      minAge: 0,
    },
    {
      id: 2,
      name: "Lunch",
      description: "Lunch items and dishes",
      image: "/placeholder.svg",
      mealPeriods: ["Lunch"],
      minAge: 0,
    },
    {
      id: 3,
      name: "Dinner",
      description: "Dinner items and dishes",
      image: "/placeholder.svg",
      mealPeriods: ["Dinner"],
      minAge: 0,
    },
    {
      id: 4,
      name: "Dessert",
      description: "Sweet treats and desserts",
      image: "/placeholder.svg",
      mealPeriods: ["Breakfast", "Lunch", "Dinner"],
      minAge: 0,
    },
  ]

  return  <CategoryList initialCategories={initialCategories} />
}
