import { Button } from "./components/ui/button";
import { Separator } from "./components/ui/separator";
import { Slider } from "./components/ui/slider";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";

import { Github, Wand2 } from "lucide-react";
import { VideoInputForm } from "./components/video-input-form";
import { PromptSelect } from "./components/prompt-select";
import { useState } from "react";

import { useCompletion } from "ai/react";
import { IAModelSelect } from "./components/ia-model-select";

export function App() {
  const [temperature, setTemperature] = useState(0.5);
  const [videoId, setVideoId] = useState<string | null>(null);

  const {
    input,
    setInput,
    handleInputChange,
    completion,
    isLoading,
    handleSubmit,
  } = useCompletion({
    api: `${import.meta.env.VITE_API_URL}/ai/complete`,
    body: {
      videoId,
      temperature,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-6 py-3 flex flex-wrap items-center justify-between border-b">
        <h1 className="text-xl font-bold">upload.ai</h1>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Desenvolvido com 💚 no NLW IA da Rocketseat
          </span>

          <Separator orientation="vertical" className="h-6" />
          <a
            href="https://github.com/sergiojunior13/upload.ai"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline">
              <Github className="w-4 h-4 mr-2" />
              Github
            </Button>
          </a>
        </div>
      </div>

      <main className="flex-col-reverse md:flex-row flex-1 p-6 flex gap-6">
        <div className="flex flex-col flex-1 gap-4">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea
              className="resize-none p-5 leading-relaxed "
              placeholder="Inclua o prompt para a IA..."
              value={input}
              onChange={handleInputChange}
            />
            <Textarea
              className="resize-none p-5 leading-relaxed"
              placeholder="Resultado gerado pela IA..."
              readOnly
              value={completion}
            />

            <p className="text-sm text-muted-foreground">
              Lembre-se: você pode utilizar a variável{" "}
              <code className="text-primary">{"{transcription}"}</code> no seu
              prompt para adicionar o conteúdo da transcrição do vídeo
              selecionado.
            </p>
          </div>
        </div>
        <aside className="md:w-80 space-y-6">
          <VideoInputForm onVideoUploaded={setVideoId} />

          <Separator />

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="ia_model_select">Prompt</Label>
              <PromptSelect onSelectedPromptChange={setInput} />

              <span className="block text-xs text-muted-foreground italic">
                Você poderá customizar essa opção em breve.
              </span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ia_model_select">Modelo</Label>
              <IAModelSelect />
              <span className="block text-xs text-muted-foreground italic">
                Você poderá customizar essa opção em breve.
              </span>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ia_model_select">Temperatura</Label>

              <Slider
                min={0}
                max={1}
                step={0.1}
                value={[temperature]}
                onValueChange={value => setTemperature(value[0])}
              />

              <span className="block text-xs text-muted-foreground italic">
                Valores mais altos tendem a deixar o resultado mais criativo
                porém com possíveis erros.
              </span>
            </div>

            <Separator />

            <Button type="submit" className="w-full" disabled={isLoading}>
              Executar <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </aside>
      </main>
    </div>
  );
}
