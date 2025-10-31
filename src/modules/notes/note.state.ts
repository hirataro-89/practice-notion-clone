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

	const deleteNote = (id: number) => {
		// childrenがある限り再帰的にループを回して削除対象のIDを取得してくる
		const findChildrenIds = (parentId: number): number[] => {
			const childrenIds = notes
				.filter((note) => note.parent_document == parentId)
				.map((child) => child.id);
			// 子ノートのIDを再帰的に取得して、削除対象のIDを取得してくる
			// スプレッド構文を用いているのは、配列の中に配列があるものを並列に展開するため
			return childrenIds.concat(...childrenIds.map((childId) => findChildrenIds(childId)));
		};
		const childrenIds = findChildrenIds(id);
		// 削除対象でないノートをsetNotesに渡してstateを更新
		// 削除対象： [...childrenIds, id] の配列に含まれるノート
		setNotes((oldNotes) => oldNotes.filter((note) => ![...childrenIds, id].includes(note.id)));
	};

	const getOne = (id: number) => notes.find((note) => note.id === id);
	const clear = () => setNotes([]);

	return {
		getAll: () => notes,
		getOne,
		set,
		delete: deleteNote,
		clear
	};
};
