import { Navigate, Outlet } from 'react-router-dom';
import SideBar from './components/SideBar';
import { SearchModal } from './components/SearchModal';
import { useCurrentUserStore } from './modules/auth/current-user.state';
import { useNoteStore } from './modules/notes/note.state';
import { useEffect, useState } from 'react';
import { noteRepository } from './modules/notes/note.repository';

const Layout = () => {
  const { currentUser } = useCurrentUserStore();
  const noteStore = useNoteStore();
  const [isLoading, setIsloading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setIsloading(true);
    const notes = await noteRepository.find(currentUser!.id);
    if (notes == null) return;
    noteStore.set(notes);
    setIsloading(false);
  }

  if (!currentUser) {
    return <Navigate to='/signin' replace />
    // replace={true} を使う場合：
    // ブラウザの履歴に /signin ページを追加したくない場合
    // ユーザーが戻るボタンを押した時に、認証が必要なページに戻らないようにしたい場合

    // replace を使わない場合：
    // ブラウザの履歴に /signin ページが追加される
    // ユーザーが戻るボタンを押すと、認証が必要なページに戻る可能性がある

    // → 認証フローならreplaceを使う
  }
  return (
    <div className="h-full flex">
      {!isLoading && <SideBar onSearchButtonClicked={() => setIsShowModal(true)} />}
      <main className="flex-1 h-full overflow-y-auto">
        <Outlet />
        <SearchModal
          isOpen={isShowModal}
          notes={[]}
          onItemSelect={() => { }}
          onKeywordChanged={() => { }}
          onClose={() => setIsShowModal(false)}
        />
      </main>
    </div>
  );
};

export default Layout;
