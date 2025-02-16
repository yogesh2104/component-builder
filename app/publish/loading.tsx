"use client"
import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="size-10 animate-spin" />
      </div>
    );
  }