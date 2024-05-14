import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
const EditPopup = ({ report, onClose }) => {
  // Add your edit form here
  return (
    <form className={cn("grid items-start gap-4")}>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" defaultValue="shadcn@example.com" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" defaultValue="@shadcn" />
      </div>
      <Button type="submit">Save changes</Button>
      <Button onClick={onClose} variant="destructive">
        Cancel
      </Button>
    </form>
  );
};

export default EditPopup;
