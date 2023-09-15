import { getFFmpeg } from "@/lib/ffmeg";
import { fetchFile } from "@ffmpeg/util";

export async function convertVideoToAudio(video: File) {
  console.log("Convert started.");

  const ffmpeg = await getFFmpeg();

  await ffmpeg.writeFile("video.mp4", await fetchFile(video));

  ffmpeg.on("progress", progress => {
    console.log(`Convert progress: ${Math.round(progress.progress * 100)}%`);
  });

  await ffmpeg.exec([
    "-i",
    "video.mp4",
    "-map",
    "0:a",
    "-b:a",
    "20k",
    "-acodec",
    "libmp3lame",
    "audio.mp3",
  ]);

  const data = await ffmpeg.readFile("audio.mp3");

  const audioFileBlob = new Blob([data], { type: "audio/mpeg" });
  const audioFile = new File([audioFileBlob], "audio.mp3", {
    type: "audio/mpeg",
  });

  console.log("Convert finished.");

  return audioFile;
}
