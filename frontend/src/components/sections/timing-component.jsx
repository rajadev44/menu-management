import useSWR, { mutate } from 'swr';
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckIcon, FilePenIcon, TrashIcon } from "lucide-react";

// Fetcher function for SWR
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function TimingComponent() {
  const { data: hours = [], error } = useSWR('/api/timings', fetcher);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [additionalInfo, setAdditionalInfo] = useState("Our restaurant is located in the heart of the city, with a cozy atmosphere and a menu that features a variety of delicious dishes. We pride ourselves on using only the freshest ingredients and providing excellent service to our customers. In addition to our regular hours, we also offer catering services for special events and private parties.");

  if (error) return <div>Failed to load</div>;
  if (!hours) return <div>Loading...</div>;

  const handleDelete = async (index) => {
    const id = hours[index].id;
    await fetch(`/api/timings/${id}`, {
      method: 'DELETE',
    });
    mutate('/api/timings');
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleSave = async (index, newHours) => {
    const id = hours[index].id;
    const updatedHours = [...hours];
    updatedHours[index].hours = newHours;
    updatedHours[index].isOutOfService = false;

    await fetch(`/api/timings/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedHours[index]),
    });

    mutate('/api/timings');
    setEditingIndex(-1);
  };

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
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
          />
          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
}
