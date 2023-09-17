import { useState, useRef, useMemo } from "react";

import { convertVideoToAudio } from "@/utils/convert-video-to-audio";

import { api } from "@/lib/axios";
import { VideoInputFormProps } from "@/components/video-input-form";

type StatusProps =
  | "waiting"
  | "converting"
  | "uploading"
  | "generating"
  | "success"
  | "error";

export const uploadStatusMessages = {
  converting: "Convertendo vídeo...",
  uploading: "Carregando...",
  generating: "Transcrevendo...",
  success: "Sucesso!",
  error: "Erro!",
};

export function useVideoInput({ onVideoUploaded }: VideoInputFormProps) {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<StatusProps>("waiting");
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

    setUploadStatus("converting");
    const audioFile = await convertVideoToAudio(videoFile);
    const data = transformAudioToFormData(audioFile);

    setUploadStatus("uploading");
    const { video } = await uploadVideoAudioToDataBase(data);

    setUploadStatus("generating");
    const videoId: string = video.id;
    generateTranscriptionFromVideo(videoId, prompt);

    setUploadStatus("success");
    console.log("Finalizou");

    onVideoUploaded(videoId);
  }

  function transformAudioToFormData(audio: File) {
    const data = new FormData();
    data.append("file", audio);

    return data;
  }

  async function uploadVideoAudioToDataBase(data: FormData) {
    const apiResponse = await api.post("/videos", data);
    return apiResponse.data;
  }

  async function generateTranscriptionFromVideo(
    videoId: string,
    prompt?: string
  ) {
    await api.post(`/videos/${videoId}/transcription`, {
      prompt,
    });
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
    uploadStatus,
  };
}
