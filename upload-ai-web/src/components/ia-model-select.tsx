import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function IAModelSelect() {
  return (
    <Select disabled defaultValue="gpt3.5">
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>

      <SelectContent id="ia_model_select">
        <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
      </SelectContent>
    </Select>
  );
}
