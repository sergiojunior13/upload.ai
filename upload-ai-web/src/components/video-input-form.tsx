import { Label } from "@radix-ui/react-label";
import { Separator } from "@radix-ui/react-select";

import { FileVideo, Upload } from "lucide-react";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

import { useVideoInput } from "@/hooks/video-input-hook";

export function VideoInputForm() {
  const { handleFileSelected, handleUploadVideo, previewURL, promptInputRef } =
    useVideoInput();

  return (
    <form onSubmit={handleUploadVideo} className="space-y-6">
      <label
        htmlFor="video"
        className="overflow-hidden border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col items-center justify-center gap-2 text-muted-foreground hover:bg-muted"
      >
        {previewURL ? (
          <video
            src={previewURL}
            controls={false}
            className="pointer-events-none"
          />
        ) : (
          <>
            <FileVideo className="w-4 h-4" />
            Selecione um vídeo
          </>
        )}
      </label>

      <input
        type="file"
        id="video"
        accept="video/mp4"
        className="sr-only"
        onChange={handleFileSelected}
      />

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="transcription_prompt">Prompt de transcrição</Label>
        <Textarea
          id="transcription_prompt"
          ref={promptInputRef}
          className="h-20 resize-none leading-relaxed"
          placeholder="Inclua palavras-chave mencionadas no vídeo separadas por vírgula (,)"
        />
      </div>
      <Button type="submit" className="w-full bg-primary">
        Carregar Video <Upload className="h-4 w-4 ml-2" />
      </Button>
    </form>
  );
}
