import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { api } from "@/lib/axios";

interface Prompt {
  id: string;
  title: string;
  template: string;
}

interface PromptsSelectProps {
  onSelectedPromptChange: (template: string) => void;
}

export function PromptSelect({ onSelectedPromptChange }: PromptsSelectProps) {
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    api.get("/prompts").then(response => setPrompts(response.data));
  }, []);

  function handleSelectedPromptChange(selectedPromptId: string) {
    const selectedPrompt = prompts.find(
      prompt => prompt.id === selectedPromptId
    );

    if (!selectedPrompt) {
      return;
    }

    onSelectedPromptChange(selectedPrompt.template);
  }

  return (
    <Select onValueChange={handleSelectedPromptChange} required>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um prompt..." />
      </SelectTrigger>

      <SelectContent id="ia_model_select">
        {prompts.map(prompt => (
          <SelectItem
            className="hover:bg-primary"
            value={prompt.id}
            key={prompt.id}
          >
            {prompt.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
