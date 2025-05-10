"use client"

import { useDispatch, useSelector } from "react-redux"
import { setStorageType } from "@/lib/features/todos/todoSlice"
import type { RootState } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { HardDrive, Cloud } from "lucide-react"

export default function StorageSelector() {
  const storageType = useSelector((state: RootState) => state.todos.storageType)
  const dispatch = useDispatch()

  return (
    <div className="flex justify-center mb-6">
      <div className="inline-flex rounded-md shadow-sm" role="group">
        <Button
          variant={storageType === "localStorage" ? "default" : "outline"}
          className="rounded-r-none"
          onClick={() => dispatch(setStorageType("localStorage"))}
        >
          <HardDrive className="h-4 w-4 mr-2" />
          Local Storage
        </Button>
        <Button
          variant={storageType === "nextcloud" ? "default" : "outline"}
          className="rounded-l-none"
          onClick={() => dispatch(setStorageType("nextcloud"))}
        >
          <Cloud className="h-4 w-4 mr-2" />
          Nextcloud
        </Button>
      </div>
    </div>
  )
}
