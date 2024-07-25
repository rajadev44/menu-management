import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function TimingComponent() {
  const [hours, setHours] = useState([
    { day: "Monday", hours: "11:00 AM - 9:00 PM", isOutOfService: false },
    { day: "Tuesday", hours: "11:00 AM - 9:00 PM", isOutOfService: false },
    { day: "Wednesday", hours: "11:00 AM - 9:00 PM", isOutOfService: false },
    { day: "Thursday", hours: "11:00 AM - 9:00 PM", isOutOfService: false },
    { day: "Friday", hours: "11:00 AM - 10:00 PM", isOutOfService: false },
    { day: "Saturday", hours: "11:00 AM - 10:00 PM", isOutOfService: false },
    { day: "Sunday", hours: "Out of Service", isOutOfService: true },
  ])
  const [editingIndex, setEditingIndex] = useState(-1)
  const handleDelete = (index) => {
    const updatedHours = [...hours]
    updatedHours[index].isOutOfService = true
    updatedHours[index].hours = "Out of Service"
    setHours(updatedHours)
  }
  const handleEdit = (index) => {
    setEditingIndex(index)
  }
  const handleSave = (index, newHours) => {
    const updatedHours = [...hours]
    updatedHours[index].hours = newHours
    updatedHours[index].isOutOfService = false
    setHours(updatedHours)
    setEditingIndex(-1)
  }
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="mb-8 text-3xl font-bold">Working Timing</h1>
      <div className="overflow-hidden rounded-lg shadow-lg bg-background">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-muted text-muted-foreground">
              <th className="px-4 py-3 font-medium text-left">Day</th>
              <th className="px-4 py-3 font-medium text-left">Hours</th>
              <th className="px-4 py-3 font-medium text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hours.map((hour, index) => (
              <tr key={index}>
                <td className="px-4 py-3 font-medium">{hour.day}</td>
                <td className="px-4 py-3">
                  {editingIndex === index ? (
                    <div className="flex items-center space-x-2">
                      <Input type="text" defaultValue={hour.hours} onBlur={(e) => handleSave(index, e.target.value)} />
                      <Button variant="ghost" size="icon" onClick={() => setEditingIndex(-1)}>
                        <CheckIcon className="w-4 h-4" />
                        <span className="sr-only">Save</span>
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span className={hour.isOutOfService ? "text-muted-foreground" : ""}>{hour.hours}</span>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(index)}>
                        <FilePenIcon className="w-4 h-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(index)}>
                    <TrashIcon className="w-4 h-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-bold">Additional Info</h2>
        <div className="p-6 rounded-lg shadow-lg bg-background">
          <Textarea
            className="w-full h-32 mb-4"
            defaultValue="Our restaurant is located in the heart of the city, with a cozy atmosphere and a menu that features a variety of delicious dishes. We pride ourselves on using only the freshest ingredients and providing excellent service to our customers. In addition to our regular hours, we also offer catering services for special events and private parties."
          />
        <Button>Save</Button>
        </div>
      </div>
    </div>
  )
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}


function FilePenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  )
}


function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}
