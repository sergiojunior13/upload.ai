import { useState, useRef, useMemo } from "react";

import { convertVideoToAudio } from "@/utils/convert-video-to-audio";

import { api } from "@/lib/axios";

export function useVideoInput() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const promptInputRef = useRef<HTMLTextAreaElement>(null);

  function handleFileSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget;

    if (!files) {
      return;
    }

    const selectedFile = files[0];

    setVideoFile(selectedFile);
  }

  async function handleUploadVideo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const prompt = promptInputRef.current?.value;

    if (!videoFile) {
      return;
    }

    const audioFile = await convertVideoToAudio(videoFile);

    const videoData = new FormData();
    videoData.append("file", audioFile);

    const apiResponse = await api.post("/videos", videoData);

    const videoId = apiResponse.data.video.id;

    await api.post(`/videos/${videoId}/transcription`, {
      prompt,
    });

    console.log("Finalizou");
  }

  const previewURL = useMemo(() => {
    if (!videoFile) {
      return null;
    }

    return URL.createObjectURL(videoFile);
  }, [videoFile]);

  return {
    handleFileSelected,
    handleUploadVideo,
    previewURL,
    promptInputRef,
  };
}
