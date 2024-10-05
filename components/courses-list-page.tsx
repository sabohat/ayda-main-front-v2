'use client'

import React, { useState } from "react"
import { Search } from 'lucide-react'
import Link from 'next/link'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import Image from 'next/image'

// Mock data for courses
const courses = [
  {
    id: 1,
    title: "Introduction to Halal Investing",
    author: "Uneesa Zaman",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    image: "/placeholder.jpeg",
    progress: 0,
    category: "Finance",
    difficulty: "Beginner",
  },
  // {
  //   id: 2,
  //   title: "Advanced Islamic Finance",
  //   author: "Ahmed Ali",
  //   authorAvatar: "/placeholder.svg?height=40&width=40",
  //   image: "/placeholder.svg?height=200&width=300",
  //   progress: 45,
  //   category: "Finance",
  //   difficulty: "Advanced",
  // },
  // {
  //   id: 3,
  //   title: "Principles of Ethical Investing",
  //   author: "Sara Ibrahim",
  //   authorAvatar: "/placeholder.svg?height=40&width=40",
  //   image: "/placeholder.svg?height=200&width=300",
  //   progress: 70,
  //   category: "Finance",
  //   difficulty: "Intermediate",
  // },
  // Add more courses as needed
]

const CourseCard = ({ course }: { course: typeof courses[number] }) => (
  <a href={`/courses/${course.id}`}>
    <Card key={course.id} className="flex flex-col">
      <CardHeader className="p-0">
        <Image
          src={course.image}
          alt={course.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
        <CardDescription className="flex items-center mb-2">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarImage src={course.authorAvatar} alt={course.author} />
            <AvatarFallback>{course.author[0]}</AvatarFallback>
          </Avatar>
          {course.author}
        </CardDescription>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">{course.category}</span>
          <span className="text-sm text-gray-500">{course.difficulty}</span>
        </div>
        <div className="flex items-center">
          <Progress value={course.progress} className="flex-grow mr-2" />
          <span className="text-sm text-gray-500">{course.progress}%</span>
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Button className="w-full">
          {course.progress === 0 ? "Start Course" : "Continue Course"}
        </Button>
      </CardFooter>
    </Card>
  </a>
)

export function CoursesListPageComponent () {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("")

  const filteredCourses = courses.filter((course) => {
    return (
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (categoryFilter === "" || course.category === categoryFilter) &&
      (difficultyFilter === "" || course.difficulty === difficultyFilter)
    )
  })

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">All Courses</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-grow">
          <Input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
            icon={<Search className="h-4 w-4 text-gray-500" />}
          />
        </div>
        <div className="flex gap-4">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Categories</SelectItem>
              <SelectItem value="Web Development">Web Development</SelectItem>
              <SelectItem value="Programming">Programming</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
            </SelectContent>
          </Select>
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Levels</SelectItem>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard course={course} />
        ))}
      </div>
    </div>
  )
}