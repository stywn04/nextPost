"use client";
import { submitPostAction } from "@/app/actions/post.action";
import { Camera, X } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { SubmitLoading } from "../submit-loading";
import { uploadImage } from "@/features/imageUpload";

export function CreatePostForm() {
  const [isPending, setTransition] = useTransition();
  const [imagePick, setImagePick] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  function imagePickHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.length) {
      setImagePick(e.target.files[0]);
    }
  }

  async function submitPostHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const content = String(formData.get("content"));
    setTransition(async () => {
      try {
        if (content.length < 1) {
          throw Error("Content cannot be empty!");
        }
        if (!imagePick) {
          await submitPostAction(content, null);
          formRef.current?.reset();
          return;
        }

        const image = await uploadImage(imagePick);
        await submitPostAction(content, image);
        formRef.current?.reset();
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      }
    });
  }
  return (
    <form ref={formRef} onSubmit={submitPostHandler} className="col-span-11">
      <fieldset disabled={isPending} className="flex flex-col gap-3">
        <textarea
          name="content"
          placeholder="what's on your mind ?"
          className="w-full h-40  resize-none p-4 rounded-md bg-transparent border border-slate-700"
        />
        <div>
          {imagePick ? (
            <div className="w-6/12 relative mb-2">
              <img
                src={URL.createObjectURL(imagePick)}
                alt="image-pick"
                className="w-full h-full object-cover rounded-md"
              />
              <button
                type="button"
                disabled={isPending}
                onClick={() => {
                  setImagePick(null);
                }}
                className="absolute top-2 right-2 bg-slate-950 border border-slate-700"
              >
                <X />
              </button>
            </div>
          ) : null}
          <input
            type="file"
            onChange={imagePickHandler}
            accept="image/*"
            hidden
            ref={fileRef}
          />
          <button
            type="button"
            onClick={() => {
              fileRef.current?.click();
            }}
          >
            <span className="text-slate-700 text-sm flex items-center gap-1">
              <Camera size={18} /> add image
            </span>
          </button>
        </div>
        <div className="flex justify-end">
          <button className="bg-slate-900 py-2 px-6 rounded-md">
            {isPending ? <SubmitLoading /> : "Submit"}
          </button>
        </div>
      </fieldset>
    </form>
  );
}
