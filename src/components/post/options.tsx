"use client";
import { MoreHorizontal } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Edit, Trash, Save } from "lucide-react";
import toast from "react-hot-toast";
export function PostOptions() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function closeDropdown(e: any) {
      if (
        !btnRef.current?.contains(e.target) &&
        !listRef.current?.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.body.addEventListener("click", closeDropdown);
    return () => document.body.removeEventListener("click", closeDropdown);
  }, []);
  return (
    <div className="relative">
      <button
        ref={btnRef}
        onClick={() => {
          setOpen(!open);
        }}
        className="cursor-pointer hover:bg-slate-900 rounded-full"
      >
        <MoreHorizontal />
      </button>
      {open && (
        <div className="absolute -bottom-32 right-0 " ref={listRef}>
          <Options />
        </div>
      )}
    </div>
  );
}

function Options() {
  return (
    <div className=" p-1 rounded-md bg-slate-950 border border-slate-900 flex flex-col items-stretch gap-2 animate-down">
      <button
        onClick={() => {
          toast.success("save");
        }}
        className="flex items-center gap-1 py-1 px-2 hover:bg-white/5 rounded"
      >
        <Save size={16} />
        Save
      </button>
      <button
        onClick={() => {
          toast.success("edit");
        }}
        className="flex items-center gap-1 py-1 px-2 hover:bg-white/5 rounded"
      >
        <Edit size={16} />
        Edit
      </button>
      <button
        onClick={() => {
          toast.success("delete");
        }}
        className="flex items-center gap-1 py-1 px-2 hover:bg-white/5 rounded"
      >
        <Trash size={16} />
        Delete
      </button>
    </div>
  );
}
