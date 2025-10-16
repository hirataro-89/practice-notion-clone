import { Navigate, Outlet } from 'react-router-dom';
import SideBar from './components/SideBar';
import { SearchModal } from './components/SearchModal';
import { useCurrentUserStore } from './modules/auth/current-user.state';

const Layout = () => {
  const { currentUser } = useCurrentUserStore();

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
      <SideBar onSearchButtonClicked={() => { }} />
      <main className="flex-1 h-full overflow-y-auto">
        <Outlet />
        <SearchModal
          isOpen={false}
          notes={[]}
          onItemSelect={() => { }}
          onKeywordChanged={() => { }}
          onClose={() => { }}
        />
      </main>
    </div>
  );
};

export default Layout;
