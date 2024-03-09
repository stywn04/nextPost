import { Heart, MessageSquare } from "lucide-react";

export function PostActivity() {
  return (
    <div className="flex items-center gap-2">
      <button>
        <Heart />
      </button>
      <button>
        <MessageSquare />
      </button>
    </div>
  );
}
