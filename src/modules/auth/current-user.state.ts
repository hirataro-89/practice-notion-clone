import { User } from "@supabase/supabase-js";
import { atom, useAtom } from "jotai";

const currentUserAtom = atom<User>();
// supabaseのUser型をインポートしてる

export const useCurrentUserStore = () => {
	const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
	return { currentUser, set: setCurrentUser };
};

// 使い方
// const currentUserStore = useCurrentUserStore();
// currentUserStore.set(userData);
// currentUserStore.currentUser;