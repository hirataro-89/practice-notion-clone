import { atom, useAtom } from "jotai";
import { Note } from "./note.entity";

const noteAtom = atom<Note[]>([]);

export const useNoteStore = () => {
	const [notes, setNotes] = useAtom(noteAtom);

	const set = (newNotes: Note[]) => {
		setNotes((oldNotes) => {
			const combineNotes = [...oldNotes, ...newNotes];
			// 既存のノートと新しいノートを結合すると重複が発生する可能性がある
			// 例: oldNotes=[note1, note2, note3] + newNotes=[note3, note4] → 重複

			const uniqueNotes: { [key: number]: Note } = {};
			// オブジェクトを定義して、重複を削除する
			// {1: note1, 2: note2}

			for (const note of combineNotes) {
				uniqueNotes[note.id] = note;
			}

			// オブジェクトの値（Note）を配列として返す
			return Object.values(uniqueNotes);
		});
	};

	const getOne = (id: number) => notes.find((note) => note.id === id);

	return {
		getAll: () => notes,
		getOne,
		set,
	};
};
