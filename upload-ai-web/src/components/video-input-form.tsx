import { FileVideo, Upload } from "lucide-react";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

import { uploadStatusMessages, useVideoInput } from "@/hooks/video-input-hook";

export interface VideoInputFormProps {
  onVideoUploaded: (videoId: string) => void;
}

export function VideoInputForm({ onVideoUploaded }: VideoInputFormProps) {
  const {
    handleFileSelected,
    handleUploadVideo,
    previewURL,
    promptInputRef,
    uploadStatus,
  } = useVideoInput({ onVideoUploaded });

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
          disabled={uploadStatus !== "waiting"}
          className="h-20 resize-none leading-relaxed"
          placeholder="Inclua palavras-chave mencionadas no vídeo separadas por vírgula (,)"
        />
      </div>
      <Button
        disabled={uploadStatus !== "waiting"}
        data-success={uploadStatus === "success"}
        type="submit"
        className="w-full bg-accent-foreground hover:bg-accent-foreground/60 text-accent data-[success='true']:bg-primary"
      >
        {uploadStatus === "waiting" ? (
          <>
            Carregar vídeo
            <Upload className="h-4 w-4 ml-2" />
          </>
        ) : (
          uploadStatusMessages[uploadStatus]
        )}
      </Button>
    </form>
  );
}
