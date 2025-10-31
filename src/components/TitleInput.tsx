import { Note } from '@/modules/notes/note.entity';
import { useState } from 'react';
import TextAreaAutoSize from 'react-textarea-autosize';

interface TitleInputProps {
  initialData: Note;
  onTitleChange: (val: string) => void;
}

export function TitleInput({ initialData, onTitleChange }: TitleInputProps) {
  const [title, setTitle] = useState(initialData.title);


  const handleTitleChange = (value: string) => {
    setTitle(value);
    onTitleChange(value);
  }
  return (
    <div className="pl-[54px] group relative">
      <TextAreaAutoSize
        className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F
        resize-none"
        value={title ?? '無題'}
        onChange={(e) => handleTitleChange(e.target.value)}
      />
    </div>
  );
}
