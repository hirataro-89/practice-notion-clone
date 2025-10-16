import { supabase } from "@/lib/supabase";

export const authRepository = {
	async signup(name: string, email: string, password: string) {
		const { data, error } = await supabase.auth.signUp({
			// メモ：supabaseのユーザー登録にユーザー名を追加。optionsに自由に設定が可能
			email,
			password,
			options: { data: { name } },
		});
		if (error != null || data.user == null) throw new Error(error?.message);

		return {
			...data.user,
			userName: data.user.user_metadata.name,
			// メモ：新規optionで追加したnameは
			// data.user.user_metadata.name で取得できる。
			// ただ、これを毎回記述するのは冗長なので、userNameとして返すようにしている
		};
	},

	async signin(email: string, password: string) {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error != null || data.user == null) throw new Error(error?.message);

		return {
			...data.user,
			userName: data.user.user_metadata.name,
		};
	},

	async getCurrentUser() {
		const { data, error } = await supabase.auth.getSession();
		if (error != null) throw new Error(error?.message);
		if (data.session == null) return;

		return {
			...data.session.user,
			userName: data.session.user.user_metadata.name,
		};
	},

};
